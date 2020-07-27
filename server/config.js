// we can save some data here, like KEYs and bullshits
module.exports = {
  development: {
    secret: 'farfoela_this_is_a_secret',
    papertrail: {
      host: 'logs6.papertrailapp.com',
      port: '30760',
      program: 'holper-server'
    }
  },
  production: {
    secret: 'farfoela_this_is_a_secret',
    papertrail: {
      host: 'logs6.papertrailapp.com',
      port: '30760',
      program: 'holper-server'
    }
  }
}
