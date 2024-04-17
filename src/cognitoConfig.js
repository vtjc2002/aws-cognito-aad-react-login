const cognitoConfig ={
    userPoolId: 'us-east-2_AJgxtQvCa',
    userPoolClientId: '5so9jbcirnn73bl3gjpjj76pt3',
    cognitoDomain: 'azure-entra-id-test.auth.us-east-2.amazoncognito.com',
    redirectSignIn: ['http://localhost:3000'],
    redirectSignOut: ['http://localhost:3000'],
    responseType: 'code',
    scopes: ['openid', 'profile', 'aws.cognito.signin.user.admin']
}

export default cognitoConfig;