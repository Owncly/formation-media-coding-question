const test = {

  "menu": [
    {
      "title": "Dashboard"
    },
    {
      "title": "Clients",
      "submenu": [
        {
          "title": "Active Clients",
          "submenu": [
            {
              "title": "Individual",
              "submenu": [
                {
                  "title": "Premium"
                },
                {
                  "title": "Basic"
                }
              ]
            },
            {
              "title": "Corporate",
              "submenu": [
                {
                  "title": "Enterprise"
                },
                {
                  "title": "Startup"
                }
              ]
            }
          ]
        },
        {
          "title": "Archived",
          "submenu": [
            {
              "title": "Last Quarter",
              "submenu": [
                {
                  "title": "Q4 Inactive"
                },
                {
                  "title": "Q3 Inactive"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Settings",
      "submenu": [
        {
          "title": "System",
          "submenu": [
            {
              "title": "Security",
              "submenu": [
                {
                  "title": "Authentication"
                },
                {
                  "title": "Encryption"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default test;