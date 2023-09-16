export default class CommentsTreeController {
  constructor() {
    this.comments = document.querySelector('.comments')
    console.log(this.comments)
  }
}

// <!-- <details class="comments__details">
// <summary class="comments__item">
//   Comments Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//   Enim, totam.
// </summary>
// <details class="comments__details">
//   <summary class="comments__item">
//     Comment1 Lorem ipsum dolor, sit amet consectetur adipisicing
//     elit. Enim, totam.
//   </summary>
//   <details class="comments__details">
//     <summary class="comments__item">
//       Comment4 Lorem ipsum dolor, sit amet consectetur adipisicing
//       elit. Enim, totam.
//     </summary>
//     <details class="comments__details">
//       <summary class="comments__item">
//         Comment5 Lorem ipsum dolor, sit amet consectetur adipisicing
//         elit. Enim, totam.
//       </summary>
//     </details>
//     <details class="comments__details">
//       <summary class="comments__item">
//         Comment4 Lorem ipsum dolor, sit amet consectetur adipisicing
//         elit. Enim, totam.
//       </summary>
//     </details>
//   </details>
// </details>
// <details class="comments__details">
//   <summary class="comments__item">
//     Comment2 Lorem ipsum dolor, sit amet consectetur adipisicing
//     elit. Enim, totam.
//   </summary>
// </details>
// <details class="comments__details">
//   <summary class="comments__item">
//     Comment3 Lorem ipsum dolor, sit amet consectetur adipisicing
//     elit. Enim, totam.
//   </summary>
// </details>
// </details> -->
