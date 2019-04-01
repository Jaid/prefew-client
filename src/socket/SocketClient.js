import socketIoClient from "socket.io-client"

export default class SocketClient {

  constructor(port) {
    this.client = socketIoClient(`localhost:${port}`)
    this.client.on("connect", () => {
      console.log("connected")
      this.client.on("hey", ({presets, images}) => {
        this.props.dispatch({
          images,
          presets,
          type: "setOptions",
        })
        this.client.on("newPreview", preview => {
          this.props.dispatch({
            type: "newPreview",
            image: preview.image,
            preset: preview.preset,
            buffer: preview.buffer |> encode,
          })
        })
      })
    })
  }

}