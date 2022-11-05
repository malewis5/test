const monetateHome = {
  channel: 'a-a4884140/d/sfcdev.shoesforcrews.com',
  events: [
    {
      eventType: 'monetate:decision:DecisionRequest',
      requestId: '3',
      includeReporting: true,
    },
    // {
    //   eventType: 'monetate:context:IpAddress',
    //   ipAddress: '11.11.11.11',
    // },
    // {
    //   eventType: 'monetate:context:CustomVariables',
    //   customVariables: [
    //     {
    //       variable: 'myCustomVariable',
    //       value: 'myCustomVariableValue',
    //     },
    //   ],
    // },
    {
      eventType: 'monetate:context:PageView',
      url: 'wwww.shoesforcrews.com',
      pageType: 'HomePage',
    },
  ],
}

module.exports = { monetateHome }
