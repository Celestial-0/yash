'use client';
'use strict';

import React from 'react';
import { useTheme } from "next-themes";
import * as dateFns from 'date-fns';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const NAMESPACE = 'react-activity-calendar';
const LABEL_MARGIN = 8; // px

const DEFAULT_MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_LABELS = {
  months: DEFAULT_MONTH_LABELS,
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  totalCount: '{{count}} activities in {{year}}',
  legend: {
    less: 'Less',
    more: 'More'
  }
};

// Remove the custom useColorScheme hook
// function useColorScheme() { ... }

function useLoadingAnimation(zeroColor, colorScheme) {
  React.useEffect(() => {
    const colorLoading = `oklab(from ${zeroColor} l a b)`;
    const colorActive =
      colorScheme === 'light'
        ? `oklab(from ${zeroColor} calc(l * 0.96) a b)`
        : `oklab(from ${zeroColor} calc(l * 1.08) a b)`;
    const loadingAnimationName = `${NAMESPACE}--loading-animation`;
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes ${loadingAnimationName} {
        0% {
          fill: ${colorLoading};
        }
        50% {
          fill: ${colorActive};
        }
        100% {
          fill: ${colorLoading};
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [zeroColor, colorScheme]);
}

const query = '(prefers-reduced-motion: reduce)';
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(true);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setPrefersReducedMotion(mediaQuery.matches);
    const onChange = event => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', onChange);
    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);
  return prefersReducedMotion;
}

function validateActivities(activities, maxLevel) {
  if (activities.length === 0) {
    throw new Error('Activity data must not be empty.');
  }
  for (const { date, level, count } of activities) {
    if (!dateFns.isValid(dateFns.parseISO(date))) {
      throw new Error(`Activity date '${date}' is not a valid ISO 8601 date string.`);
    }
    if (count < 0) {
      throw new RangeError(`Activity count must not be negative, found ${count}.`);
    }
    if (level < 0 || level > maxLevel) {
      throw new RangeError(`Activity level ${level} for ${date} is out of range. It must be between 0 and ${maxLevel}.`);
    }
  }
}

function groupByWeeks(activities, weekStart = 0 // 0 = Sunday
) {
  const normalizedActivities = fillHoles(activities);

  // Determine the first date of the calendar. If the first date is not the
  // passed weekday, the respective weekday one week earlier is used.
  const firstActivity = normalizedActivities[0];
  const firstDate = dateFns.parseISO(firstActivity.date);
  const firstCalendarDate =
    dateFns.getDay(firstDate) === weekStart
      ? firstDate
      : dateFns.subWeeks(dateFns.nextDay(firstDate, weekStart), 1);

  // To correctly group activities by week, it is necessary to left-pad the list
  // because the first date might not be set start weekday.
  const paddedActivities = [
    ...Array(dateFns.differenceInCalendarDays(firstDate, firstCalendarDate)).fill(undefined),
    ...normalizedActivities
  ];
  const numberOfWeeks = Math.ceil(paddedActivities.length / 7);

  // Finally, group activities by week
  return range(numberOfWeeks).map(weekIndex => paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7));
}

/**
 * The calendar expects a continuous sequence of days,
 * so fill gaps with empty activity data.
 */
function fillHoles(activities) {
  const calendar = new Map(activities.map(a => [a.date, a]));
  const firstActivity = activities[0];
  const lastActivity = activities[activities.length - 1];
  return dateFns.eachDayOfInterval({
    start: dateFns.parseISO(firstActivity.date),
    end: dateFns.parseISO(lastActivity.date)
  }).map(day => {
    const date = dateFns.formatISO(day, { representation: 'date' });
    if (calendar.has(date)) {
      return calendar.get(date);
    }
    return { date, count: 0, level: 0 };
  });
}

function getClassName(name) {
  return `${NAMESPACE}__${name}`;
}

function generateEmptyData() {
  const year = new Date().getFullYear();
  const days = dateFns.eachDayOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31)
  });
  return days.map(date => ({
    date: dateFns.formatISO(date, { representation: 'date' }),
    count: 0,
    level: 0
  }));
}

function range(n) {
  return [...Array(n).keys()];
}

function getMonthLabels(weeks, monthNames = DEFAULT_MONTH_LABELS) {
  return weeks
    .reduce((labels, week, weekIndex) => {
      const firstActivity = week.find(activity => activity !== undefined);
      if (!firstActivity) {
        throw new Error(`Unexpected error: Week ${weekIndex + 1} is empty.`);
      }
      const month = monthNames[dateFns.getMonth(dateFns.parseISO(firstActivity.date))];
      if (!month) {
        const monthName = new Date(firstActivity.date).toLocaleString('en-US', { month: 'short' });
        throw new Error(`Unexpected error: undefined month label for ${monthName}.`);
      }
      const prevLabel = labels[labels.length - 1];
      if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
        return [...labels, { weekIndex, label: month }];
      }
      return labels;
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      // Labels should only be shown if there is "enough" space (data).
      // This is a naive implementation that does not take the block size,
      // font size, etc. into account.
      const minWeeks = 3;

      // Skip the first month label if there is not enough space to the next one.
      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
      }

      // Skip the last month label if there is not enough data in that month
      // to avoid overflowing the calendar on the right.
      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }
      return true;
    });
}

function maxWeekdayLabelWidth(labels, showWeekdayLabel, fontSize) {
  if (labels.length !== 7) {
    throw new Error('Exactly 7 labels, one for each weekday must be passed.');
  }
  return labels.reduce(
    (maxWidth, label, index) =>
      showWeekdayLabel.byDayIndex(index)
        ? Math.max(maxWidth, Math.ceil(calcTextDimensions(label, fontSize).width))
        : maxWidth,
    0
  );
}

function calcTextDimensions(text, fontSize) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  if (fontSize < 1) {
    throw new RangeError('fontSize must be positive');
  }
  if (text.length === 0) {
    return { width: 0, height: 0 };
  }
  const namespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(namespace, 'svg');
  svg.style.position = 'absolute';
  svg.style.visibility = 'hidden';
  svg.style.fontFamily = window.getComputedStyle(document.body).fontFamily;
  svg.style.fontSize = `${fontSize}px`;
  const textNode = document.createElementNS(namespace, 'text');
  textNode.textContent = text;
  svg.appendChild(textNode);
  document.body.appendChild(svg);
  const boundingBox = textNode.getBBox();
  document.body.removeChild(svg);
  return { width: boundingBox.width, height: boundingBox.height };
}

function initWeekdayLabels(input, weekStart) {
  if (!input)
    return { byDayIndex: () => false, shouldShow: false };

  // Default: Show every second day of the week.
  if (input === true) {
    return {
      byDayIndex: index => {
        return (7 + index - weekStart) % 7 % 2 !== 0;
      },
      shouldShow: true
    };
  }
  const indexed = [];
  for (const name of input) {
    const index = dayNameToIndex[name.toLowerCase()];
    indexed[index] = true;
  }
  return {
    byDayIndex: index => indexed[index] ?? false,
    shouldShow: input.length > 0
  };
}

const dayNameToIndex = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

function createTheme(input, steps = 5) {
  const defaultTheme = createDefaultTheme(steps);
  if (input) {
    validateInput(input, steps);
    input.light = input.light ?? defaultTheme.light;
    input.dark = input.dark ?? defaultTheme.dark;
    return {
      light: isPair(input.light) ? calcColorScale(input.light, steps) : input.light,
      dark: isPair(input.dark) ? calcColorScale(input.dark, steps) : input.dark
    };
  }
  return defaultTheme;
}

function createDefaultTheme(steps) {
  return {
    light: calcColorScale(['hsl(0, 0%, 92%)', 'hsl(0, 0%, 26%)'], steps),
    dark: calcColorScale(['hsl(0, 0%, 22%)', 'hsl(0, 0%, 92%)'], steps)
  };
}

function validateInput(input, steps) {
  if (typeof input !== 'object' || (input.light === undefined && input.dark === undefined)) {
    throw new Error(
      `The theme object must contain at least one of the fields "light" and "dark" with exactly 2 or ${steps} colors respectively.`
    );
  }
  if (input.light) {
    const { length } = input.light;
    if (length !== 2 && length !== steps) {
      throw new Error(`theme.light must contain exactly 2 or ${steps} colors, ${length} passed.`);
    }
    for (const c of input.light) {
      if (typeof window !== 'undefined' && !CSS.supports('color', c)) {
        throw new Error(`Invalid color "${String(c)}" passed. All CSS color formats are accepted.`);
      }
    }
  }
  if (input.dark) {
    const { length } = input.dark;
    if (length !== 2 && length !== steps) {
      throw new Error(`theme.dark must contain exactly 2 or ${steps} colors, ${length} passed.`);
    }
    for (const c of input.dark) {
      if (typeof window !== 'undefined' && !CSS.supports('color', c)) {
        throw new Error(`Invalid color "${String(c)}" passed. All CSS color formats are accepted.`);
      }
    }
  }
}

function calcColorScale([start, end], steps) {
  return range(steps).map(i => {
    // In the loading animation the zero color is used.
    // However, Safari 16 crashes if a CSS color-mix expression like below is
    // combined with relative color syntax to calculate a hue variation for the
    // animation. Since the start and end colors do not need to be mixed, they
    // can be returned directly to work around this issue.
    switch (i) {
      case 0:
        return start;
      case steps - 1:
        return end;
      default: {
        const pos = i / (steps - 1) * 100;
        return `color-mix(in oklab, ${end} ${parseFloat(pos.toFixed(2))}%, ${start})`;
      }
    }
  });
}

function isPair(val) {
  return val.length === 2;
}

const styles = {
  container: fontSize => ({
    width: 'max-content',
    // Calendar should not grow
    maxWidth: '100%',
    // Do not remove - parent might be a flexbox
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: `${fontSize}px`
  }),
  scrollContainer: fontSize => ({
    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingTop: Math.ceil(0.1 * fontSize) // SVG <text> overflows in Firefox at y=0
  }),
  calendar: {
    display: 'block',
    // SVGs are inline-block by default
    overflow: 'visible' // Weekday labels are rendered left of the container
  },
  rect: colorScheme => ({
    stroke: colorScheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.04)'
  }),
  footer: {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 16px',
      whiteSpace: 'nowrap'
    },
    legend: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '3px'
    }
  }
};

const ActivityCalendar = React.forwardRef(
  (
    {
      data: activities,
      blockMargin = 4,
      blockRadius = 2,
      blockSize = 12,
      colorScheme: colorSchemeProp = undefined,
      eventHandlers = {},
      fontSize = 14,
      hideColorLegend = false,
      hideMonthLabels = false,
      hideTotalCount = false,
      labels: labelsProp = undefined,
      maxLevel = 4,
      loading = false,
      renderBlock = undefined,
      renderColorLegend = undefined,
      showWeekdayLabels = false,
      style: styleProp = {},
      theme: themeProp = undefined,
      totalCount: totalCountProp = undefined,
      weekStart = 0 // Sunday
    },
    ref
  ) => {
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
      setIsClient(true);
    }, []);

    maxLevel = Math.max(1, maxLevel);
    const theme = createTheme(themeProp, maxLevel + 1);

    // Use next-themes to get the current theme:
    const { theme: nextTheme } = useTheme();
    const colorScheme = colorSchemeProp ?? nextTheme;

    const colorScale = theme[colorScheme];
    useLoadingAnimation(colorScale[0], colorScheme);
    const useAnimation = !usePrefersReducedMotion();
    if (loading) {
      activities = generateEmptyData();
    }
    validateActivities(activities, maxLevel);
    const firstActivity = activities[0];
    const year = dateFns.getYear(dateFns.parseISO(firstActivity.date));
    const weeks = groupByWeeks(activities, weekStart);
    const labels = { ...DEFAULT_LABELS, ...labelsProp };
    const labelHeight = hideMonthLabels ? 0 : fontSize + LABEL_MARGIN;
    const weekdayLabels = initWeekdayLabels(showWeekdayLabels, weekStart);

    // Must be calculated on the client or SSR hydration errors will occur
    // because server and client HTML would not match.
    const weekdayLabelOffset =
      isClient && weekdayLabels.shouldShow
        ? maxWeekdayLabelWidth(labels.weekdays, weekdayLabels, fontSize) + LABEL_MARGIN
        : undefined;

    function getDimensions() {
      return {
        width: weeks.length * (blockSize + blockMargin) - blockMargin,
        height: labelHeight + (blockSize + blockMargin) * 7 - blockMargin
      };
    }
    function getEventHandlers(activity) {
      return Object.keys(eventHandlers).reduce(
        (handlers, key) => ({
          ...handlers,
          [key]: event => eventHandlers[key]?.(event)(activity)
        }),
        {}
      );
    }
    function renderCalendar() {
      return weeks
        .map((week, weekIndex) =>
          week.map((activity, dayIndex) => {
            if (!activity) {
              return null;
            }
            const loadingAnimation =
              loading && useAnimation
                ? {
                    animation: `${NAMESPACE}--loading-animation 1.75s ease-in-out infinite`,
                    animationDelay: `${weekIndex * 20 + dayIndex * 20}ms`
                  }
                : undefined;
            const block = _jsx("rect", {
              ...getEventHandlers(activity),
              x: 0,
              y: labelHeight + (blockSize + blockMargin) * dayIndex,
              width: blockSize,
              height: blockSize,
              rx: blockRadius,
              ry: blockRadius,
              fill: colorScale[activity.level],
              "data-date": activity.date,
              "data-level": activity.level,
              style: { ...styles.rect(colorScheme), ...loadingAnimation }
            });
            return _jsx(
              React.Fragment,
              { children: renderBlock ? renderBlock(block, activity) : block },
              activity.date
            );
          })
        )
        .map((week, x) =>
          _jsx(
            "g",
            { transform: `translate(${(blockSize + blockMargin) * x}, 0)`, children: week },
            x
          )
        );
    }
    function renderFooter() {
      if (hideTotalCount && hideColorLegend) {
        return null;
      }
      const totalCount =
        typeof totalCountProp === 'number'
          ? totalCountProp
          : activities.reduce((sum, activity) => sum + activity.count, 0);
      return _jsxs(
        "footer",
        {
          className: getClassName('footer'),
          style: { ...styles.footer.container, marginLeft: weekdayLabelOffset },
          children: [
            loading && _jsx("div", { children: "\xA0" }),
            !loading &&
              !hideTotalCount &&
              _jsx("div", {
                className: getClassName('count'),
                children: labels.totalCount
                  ? labels.totalCount.replace('{{count}}', String(totalCount)).replace('{{year}}', String(year))
                  : `${totalCount} activities in ${year}`
              }),
            !loading &&
              !hideColorLegend &&
              _jsxs("div", {
                className: getClassName('legend-colors'),
                style: styles.footer.legend,
                children: [
                  _jsx("span", { style: { marginRight: '0.4em' }, children: labels.legend.less }),
                  range(maxLevel + 1).map(level => {
                    const block = _jsx("svg", {
                      width: blockSize,
                      height: blockSize,
                      children: _jsx("rect", {
                        width: blockSize,
                        height: blockSize,
                        fill: colorScale[level],
                        rx: blockRadius,
                        ry: blockRadius,
                        style: styles.rect(colorScheme)
                      })
                    });
                    return _jsx(React.Fragment, { children: renderColorLegend ? renderColorLegend(block, level) : block }, level);
                  }),
                  _jsx("span", { style: { marginLeft: '0.4em' }, children: labels.legend.more })
                ]
              })
          ]
        },
        "footer"
      );
    }
    function renderWeekdayLabels() {
      if (!weekdayLabels.shouldShow) {
        return null;
      }
      return _jsx(
        "g",
        {
          className: getClassName('legend-weekday'),
          children: range(7).map(index => {
            const dayIndex = (index + weekStart) % 7;
            if (!weekdayLabels.byDayIndex(dayIndex)) {
              return null;
            }
            return _jsx(
              "text",
              {
                x: -8,
                y: labelHeight + (blockSize + blockMargin) * index + blockSize / 2,
                dominantBaseline: "central",
                textAnchor: "end",
                fill: "currentColor",
                children: labels.weekdays[dayIndex]
              },
              index
            );
          })
        },
        "weekdayLabels"
      );
    }
    function renderMonthLabels() {
      if (hideMonthLabels) {
        return null;
      }
      return _jsx(
        "g",
        {
          className: getClassName('legend-month'),
          children: getMonthLabels(weeks, labels.months).map(({ label, weekIndex }) =>
            _jsx(
              "text",
              {
                x: (blockSize + blockMargin) * weekIndex,
                y: 0,
                dominantBaseline: "hanging",
                fill: "currentColor",
                children: label
              },
              weekIndex
            )
          )
        },
        "monthLabels"
      );
    }
    const { width, height } = getDimensions();
    return _jsxs(
      "article",
      {
        ref: ref,
        className: NAMESPACE,
        style: { ...styleProp, ...styles.container(fontSize) },
        children: [
          _jsx(
            "div",
            {
              className: getClassName('scroll-container'),
              style: styles.scrollContainer(fontSize),
              children: _jsxs(
                "svg",
                {
                  width: width,
                  height: height,
                  viewBox: `0 0 ${width} ${height}`,
                  className: getClassName('calendar'),
                  style: { ...styles.calendar, marginLeft: weekdayLabelOffset },
                  children: [!loading && renderWeekdayLabels(), !loading && renderMonthLabels(), renderCalendar()]
                }
              )
            },
            "scroll-container"
          ),
          renderFooter()
        ]
      },
      "activity-calendar"
    );
  }
);

ActivityCalendar.displayName = 'ActivityCalendar';
const Skeleton = props => _jsx(ActivityCalendar, { data: [], ...props });

export { ActivityCalendar, Skeleton };
export default ActivityCalendar;
