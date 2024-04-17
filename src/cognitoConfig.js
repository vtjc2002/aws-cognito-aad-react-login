const cognitoConfig ={
    userPoolId: 'us-east-2_AJgxtQvCa',
    userPoolClientId: '5so9jbcirnn73bl3gjpjj76pt3',
    cognitoDomain: 'azure-entra-id-test.auth.us-east-2.amazoncognito.com',
    redirectSignIn: ['http://localhost:3000','https://witty-beach-00687fa0f.5.azurestaticapps.net'],
    redirectSignOut: ['http://localhost:3000','https://witty-beach-00687fa0f.5.azurestaticapps.net'],
    responseType: 'code',
    scopes: ['openid', 'profile', 'aws.cognito.signin.user.admin']
}

export default cognitoConfig;