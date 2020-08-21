module.exports = {
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
  ],
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "debug": false,
        "targets": {
          "browsers": [
            "last 3 versions"
          ]
        }
      }
    ],
    "@babel/preset-react"
  ],
  "env": {
    "test": {
      "presets": [
        "@babel/preset-typescript",
        "@babel/preset-react",
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "usage",
            "corejs": {
              "version": 3,
              "proposals": true
            },
            "debug": false,
            "targets": {
              "browsers": [
                "last 3 versions"
              ]
            }
          }
        ]
      ],
      "plugins": [
        ["emotion", {
          "inline": true,
          "sourceMap": true
        }],
        // ["module-resolver", {
        //   "root": ["./"],
        //   "alias": {
        //   }
        // }],
        // [
        //   "@babel/plugin-proposal-decorators",
        //   {
        //     "legacy": true
        //   }
        // ],
        "@babel/plugin-proposal-class-properties"
      ]
    }
  }
};
