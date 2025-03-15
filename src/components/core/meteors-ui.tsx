import { Meteors } from "@/components/magicui/meteors";

export function Meteor() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden ">
      <Meteors number={40} />
     
    </div>
  );
}
