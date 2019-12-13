import path from "path"
import configure from "webpack-config-jaid"

export default configure({
  terserOptions: false,
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})