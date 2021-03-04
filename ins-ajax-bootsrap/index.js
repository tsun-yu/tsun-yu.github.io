const slr = (id) => document.querySelector(id);

$.ajax({
  method: "GET",
  url: "./ins.json",
  // url:
  //   "https://instagram.com/graphql/query/?query_id=17888483320059182&id=39431801958&first=12",
}).done(function (result) {
  // console.log("result", result);
  // console.log(result.graphql.user.edge_owner_to_timeline_media.edges[0].node);

  //profile image
  document.querySelector(
    ".profileImg > img"
  ).src = `${result.graphql.user.profile_pic_url_hd}`;
  $(".profileImg > img").attr("src", result.graphql.user.profile_pic_url_hd);

  //info
  $(".username").html(result.graphql.user.username);
  const followerNum = result.graphql.user.edge_followed_by.count / 1000 + "k";
  $(".followerNum").html(followerNum);
  $(".followingNum").html(result.graphql.user.edge_follow.count);
  $(".thirdRow .font-weight-bold").html(result.graphql.user.full_name);
  $(".infoText").html(result.graphql.user.biography);

  //post
  let postArr = result.graphql.user.edge_owner_to_timeline_media.edges;
  for (let i = 0; i < postArr.length; i++) {
    let display = `<div class="col-4 position-relative overflow-hidden pt-4"><img src="${postArr[i].node.thumbnail_src}",alt=""/>
    </div>`;
    $(".contentArea").append(display);
  }

  // related account
  let relatedArr = result.graphql.user.edge_related_profiles.edges;
  for (let i = 0; i < relatedArr.length; i++) {
    let display = `<div class="cards border px-2 pt-2 pb-4 mx-3">
    <span class="float-right"><i class="fas fa-times"></i></span>
    <div class="cardImgArea mx-auto mt-3">
    <img src="${relatedArr[i].node.profile_pic_url}" alt=""/>
    </div>
    <p class="font-weight-bold text-center text-truncate mt-3 mb-1">${relatedArr[i].node.username}</p>
    <p class="text-center text-truncate mb-3">${relatedArr[i].node.fullname}</p>
    <button class="btn btn-primary btn-sm w-100">Follow</button>
    </div>`;
    $(".relatedAccounts").append(display);
  }
});

//highlight
$.ajax({
  method: "GET",
  url: "./ins-highlight.json",
  // url: "./ins-highlight.json",
}).done(function (result) {
  let highlightArr = result.data.user.edge_highlight_reels.edges;
  let display = ``;
  for (let i = 0; i < highlightArr.length; i++) {
    display += `<div class="circle">
  <img src="${highlightArr[i].node.cover_media.thumbnail_src}" alt=""/>
  <p class="font-weight-bold mt-2 text-center small text-truncate">
    ${highlightArr[i].node.title}</p></div>`;
  }
  $(".highlight").append(display);
});

//related accounts ARROW
$(".relative-btn-left").addClass("hide");

let scrollLeft = 0;
$(".relative-btn-right").click(function () {
  $(".relatedAccounts").scrollLeft(scrollLeft);
  scrollLeft += 100;
  scrollLeft > 0 && $(".relative-btn-left").removeClass("hide");
});

$(".relative-btn-left").click(function () {
  scrollLeft -= 100;
  $(".relatedAccounts").scrollLeft(scrollLeft);
  scrollLeft === 0 && $(".relative-btn-left").addClass("hide");
});
