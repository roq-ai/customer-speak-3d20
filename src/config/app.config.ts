interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Team Member', 'Customer Service Representative', 'Data Analyst'],
  tenantName: 'Business',
  applicationName: 'Customer Speak',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Fill the feedback form', 'Provide name and number in feedback form'],
  ownerAbilities: [
    'Manage feedback forms',
    'View customer feedback dashboard',
    'Invite Team Members, Customer Service Representatives, and Data Analysts',
    "View customer's name and number in the dashboard",
  ],
};
