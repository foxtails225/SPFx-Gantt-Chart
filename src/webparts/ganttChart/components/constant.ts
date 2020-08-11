export const config = {
  client_id: '5ad93717-1ef7-4f1a-ad99-fd39ecbdea8e',
  tenent_id: 'c20a081b-c063-4eec-a696-ab10d1e15e70',
  grant_type: 'client_credentials',
  redirectUri: 'https://localhost:4321/',
  scope: 'user.read%20openid%20profile%20offline_access',
  client_secret: 'X8qRT1-2Zj4kuZ~Ml86PYs-Xbc-_vs09-E',
  resource: 'https://graph.microsoft.com',
};

export const urls = {
  getChartType: `https://graph.microsoft.com/v1.0/me/drive/items/01UGS7U3G4EISTGNSRAVFJ2ADXKBKXA6UP/workbook/worksheets('Chart_Types')/range(address='a1:g64')?$select=values`,
  getResource: `https://graph.microsoft.com/v1.0/me/drive/items/01UGS7U3G4EISTGNSRAVFJ2ADXKBKXA6UP/workbook/worksheets('Resource_Usage')/range(address='a1:g100')?$select=values`,
};
