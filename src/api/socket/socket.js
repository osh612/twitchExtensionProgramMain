// import Vue from 'vue'
// import io from 'socket.io-client'

// let com_socket
// let admin_socket
// let schedule_socket

// const isChoco12ExtensionHost =
//   window.location.host === 'wioem02d7v012u78es98xjy317u41a.ext-twitch.tv'
// const isChoco13ExtensionHost =
//   window.location.host === 'b6xe60269zqk8vgvyjrga2ypba4hy7.ext-twitch.tv'

// if (isChoco12ExtensionHost) {
//   com_socket = io('https://app.decakill.work:13000')
//   admin_socket = io('https://app.decakill.work:23000')
//   schedule_socket = io('https://app.decakill.work:33000')
// } else if (isChoco13ExtensionHost) {
//   com_socket = io('https://api.decakill.live:13000')
//   admin_socket = io('https://api.decakill.live:23000')
//   schedule_socket = io('https://api.decakill.live:33000')
// } else {
//   // 관리자 Local
//   // com_socket = io('https://app.decakill.work:13000')
//   // admin_socket = io('https://app.decakill.work:23000')
//   // schedule_socket = io('https://app.decakill.work:33000')

//   // 관리자 decakill
//   com_socket = io('https://api.decakill.live:13000')
//   admin_socket = io('https://api.decakill.live:23000')
//   schedule_socket = io('https://api.decakill.live:33000')
// }
// const SocketPlugin = {
//   install(vue) {
//     vue.mixin({})
//     // 인스턴스 메소드 추가
//     vue.prototype.$com_socket = com_socket
//     vue.prototype.$admin_socket = admin_socket
//     vue.prototype.$schedule_socket = schedule_socket
//   },
// }
// Vue.use(SocketPlugin)

// export default {
//   com_socket,
// }
