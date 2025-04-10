export interface CERTIFICATE {
    name: string;
    issuingOrganization: string;
    imgSrc: string;
    issueDate: string;
    expirationDate?: string;
    credentialID: string;
    credentialURL?: string;
    skills: string[];
    media?: string[];
}