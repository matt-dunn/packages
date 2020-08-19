module.exports = {
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
  ],
  presets: [
    '@babel/preset-typescript',
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
    '@babel/preset-react'
  ]
};
