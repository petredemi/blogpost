

const btnSignup = document.querySelector('#btnSignup')
const btnlogin = document.querySelector('#btnlogin')
const btnmsg = document.querySelector('#msgbtn')
const logout = document.querySelector('#logout')
const namex = document.querySelector('#name')
const email = document.querySelector('#email')
const passw= document.querySelector('#passw')
const profession= document.querySelector('#profession')
const authorreq= document.querySelector('#authorreq')
const logemail = document.querySelector('#logemail')
const loginPassw = document.querySelector('#loginPassw')
const users = document.querySelector('.users')
const title = document.querySelector('#title')
const content = document.querySelector('#mesg')
const messageslist = document.querySelector(".messageslist")
let messagesadded = document.querySelectorAll('.messageslist > .post > .postcontent > .postdel')
const logedin = document.querySelector('#logedin')
let tu //user id
let tm    //post/message id 
let tx    // post del button
let reqx
console.log(messagesadded)
$(document).ready(function(){
  $("#signup").click(function(){
    $(".adduser").slideToggle("slow")
    $('#name').val('')
    $('#email').val('')
    $('#passw').val('')
    $('#profession').val('')
    $('#authorreq').val('')
    $(".loginuser").slideUp("slow")
    $('.messagepost').slideUp('slow')
  });
});
$(document).ready(function(){
  $("#login").click(function(){
    $(".loginuser").slideToggle("slow").css('display', 'flexx');
    $('#logemail').val('')
    $('#loginPassw').val('')
    $(".adduser").slideUp("slow")
    $('.messagepost').slideUp('slow')
  });
});
$(document).ready(function(){
  $("#btnlogin").click(function(){
    $(".loginuser").slideUp("slow");
  });
});
$(document).ready(function(){
  $("#addmessage").click(function(){
    $(".messagepost").slideToggle('slow').css('display', 'flex');
    $('#title').val('')
    $('#mesg').val('')
    $(".loginuser").slideUp("slow");
    $(".adduser").slideUp("slow")
  });
});
$(document).ready(function(){
  $("#msgbtn").click(function(){
    $(".messagepost").slideUp("slow");
  });
});

$(document).ready( function(){
   $('#uploadpic').click(function(){
        $('.uploadprofiles').slideToggle('slow').css('display', 'flex')
   })

 console.log($('h3').text())
})
$(document).ready(function(){
  $("#btnSignup").click(function(){
    $(".adduser").slideUp("slow");
  });
});
// $(`#post${tm}`).find('.postcomments').off('click').on('click',function(){
//        $(`#post${tm}`).children(".comments").slideToggle('slow');
//
//    })   
async function signUp(){
  if(namex.value == '' || email.value == ''|| passw.value == ''){return}
  if(!email.value.includes("@") ){        //email.value.includes('.')){ 
    console.log('need an email adress')
    return
  }
    const data = {
         name: namex.value,
         email: email.value,
         password: passw.value,
         profession: profession.value,
         authorreq: authorreq.checked
      }
    const response = await fetch('http://localhost:3000/user', {
    method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify(data)
    });
    if(response.status == 200){
        const text = await response.text();
    return text
     }            
}
btnSignup.addEventListener('click', async() => {
    const blogposttoken =  await signUp()
    if( blogposttoken == undefined){return}
    let x = JSON.parse(blogposttoken)
    localStorage.setItem("blogposttoken", x.token)
        await loadPage()
    console.log(blogposttoken)
})
async function authorsPage(){
        const token = localStorage.getItem('blogposttoken')
        const response = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${token}`,
          },
        });
      const text = await response.text();
      const data = JSON.parse(text)
      let userloged = data.authData
      logedin.textContent = userloged.user.name
      if(userloged){
          $("#login").hide()
          $("#signup").hide()
          $("#addmessage").show()
          $("#logout").show()
      } else{ return }
      const authors = data.users
      authors.forEach((value) =>{
        divuser = document.createElement('div')
        divuser.classList.add('usernameemail')
        let div = document.createElement('div')
        div.classList.add('username')
        let divemail = document.createElement('div')
        divemail.classList.add('useremail')
        div.textContent = value.name
        divemail.textContent = value.email
        users.appendChild(divuser)
        divuser.append(div, divemail)
    })
  }
async function logIn(){
    const data = {
         email: logemail.value,
         password: loginPassw.value
      }
    const response = await fetch('http://localhost:3000/log-in', {
    method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify(data)
    });
    if(response.status == 200){
              $("#login").hide()
              $("#signup").hide()
              $("#addmessage").show()
              $("#logout").show()
              $("#uploadpic").show()
          const text = await response.text();
          return text
    }else{ console.log('wrong')}
}

btnlogin.addEventListener('click', async() => {
   const blogposttoken = await logIn()
   let x = JSON.parse(blogposttoken)
   localStorage.setItem("blogposttoken", x.token)
   await loadPage()
})

async function postMessage(){
      const token = localStorage.getItem('blogposttoken')
        const data = {
             title: title.value,
             content: content.value,
          }
        const response = await fetch('http://localhost:3000/message',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
           },
          body: JSON.stringify(data)
        });
         let text = await response.text()
         let textx = JSON.parse(text)
        if (response.status == 200){
          return textx
        }
  }

let postIds = []
btnmsg.addEventListener('click', async() => {
    let textx = await postMessage()
    postIds.push(textx.id)
          let postelem = `
                  <div class= "post ${textx.authorId}" id="post${textx.id}" >
                      <div class= "postcontent"> 
                            <h4> ${textx.title}</h4>
                            <p> ${textx.content} </p>
                      </div>
                      <h5> Author: ${logedin.textContent} </h5>
                     <div class="postbuttons">
                            <button class="postdel">del</button>
                            <button class="postedit">edit</button>
                            <button class="uploadpicture">add image</button>
                              <div class="uploadPicPost">
                                  <form id="uploadPic${textx.id}"  action="http://localhost:3000/picture/${textx.id}" method="post" enctype="multipart/form-data" method="post">
                                    <input type="file" name="profileimg"  id="pic${textx.id}" />
                                    <input type="submit" value="upload pic" class="uploadbtn">
                                  </form>    
                              </div>
                      </div>  

                  </div>
                  `
          $('.messageslist').append(postelem)         
          
        console.log(postIds)
        mouseUp()
        postIdmouseEnter()
        getPostId()
        console.log(messagesadded)
        title.value = ''
        content.value = ''
})

async function delUser(x){
    const token = localStorage.getItem('blogposttoken')
    const response = await fetch(`http://localhost:3000/user/${x}`, {
    method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
       },
    });
    const text = await response.text();
    console.log(text);
}
async function delMessage(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `http://localhost:3000/message/${x}`, 
        type: 'DELETE',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
        success: function(data, status){
            console.log(data)
      console.log(messagesadded)

        }
    })
}
async function editPost(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `http://localhost:3000/message/${x}`, 
        type: 'GET',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+token,
        },
        success: function(data, status){
               //
                let ef = `
                    <div class="editform" >
                      <label for="titleedit">title
                      <input type="text" name="titleedit" id="titleedit" value="${data.title}">
                      </label>
                      <label for="mesgedit">message </label>
                      <textarea name="mesgedit" id="mesgedit"> ${data.content}</textarea>
                      <button type="submit" class="submitedit" style="width: 60px; margin: 10px;">submit</button>
                    </div>
                  `
             //    $(`#post${x}`).children('.postcontent').hide()
                $(`#post${x}`).children('.postcontent, h5, .postbuttons').hide()
                $(`#post${x}`).append(ef)
                $(`#post${x}`).find('.submitedit').on('click', async function(){
              
                      await updatePost(x)             
               })
            }
        })
}
async function updatePost(x){
    const token = localStorage.getItem('blogposttoken')
  //  let tm
    $.ajax({
        url: `http://localhost:3000/message/${x}`, 
        type: 'PUT',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
         data: {
          title: $('#titleedit').val(),
          content: $('#mesgedit').val(),
        },
        success: function(data, status){
                  console.log(status)
                  console.log(data.title)
                  if(status == 'success'){
              //let postupdated = ` 
              //   <div class= "postcontent"> 
              //                <h4> ${data.title} </h4>
              //                <p> ${data.content} </p>
              //                <h5> Author:${data.authorId}</h5>
              //                <button class="postdel">del</button>
              //                <button class="postedit">edit</button>
              //        </div>
              //  `
              // $(`#post${x}`).html(postupdated)
              $(`#post${x}`).children('.postcontent, h5, .postbuttons').show()
              $(`#post${x}`).children('.postcontent').children('h4').text(data.title)
              $(`#post${x}`).children('.postcontent').children('p').text(data.content)
              $(`#post${x}`).children('.editform').remove()


              }
            }
        })
}

async function loadPage(){
  $(document).ready(async function(){
    let token = await localStorage.getItem('blogposttoken')
    $.ajaxSetup({
          headers:{
            "Authorization": "Bearer " +token,
        }
    })
    $.ajax({
        url: 'http://localhost:3000', 
        type: 'GET',
        headers: {
            "Accept": "application/json",
            "contentType": "application/json",
         //   "Authorization": "Bearer " +token,
        },
        success: async function(data, status){
        // const token = localStorage.getItem('blogposttoken')
        if(status == 'success'){
          const users = await data.users
          const posts =  await data.messages
          let iduser= data.authData.user.id
          console.log(users)
          console.log(iduser)
            function findName(y){
                let us = users.find(x => x.id == y)
                 return us.name
                }
            function findUrl(y){
                let us = users.find(x => x.id == y)
                 return us.profile
                }
            function checkIfAuthor(x){
              if(x == false){ return 'blog member'}
              else if(x == true){return 'blog author'}
            }
              console.log(findUrl(iduser))
              let userloged = data.authData
              logedin.textContent = userloged.user.name
              $('.userpict').html(`<img src = "${findUrl(iduser)}"  alt = "portrait">`)
              console.log(userloged)

          if(userloged != undefined){/////
              $("#login").hide()
              $("#signup").hide()
              $("#addmessage").show()
              $("#logout").show()
              $("#uploadpic").show()
              $("#logout").click(function(){
                localStorage.removeItem('blogposttoken')
                  $("#login").show()
                  $("#signup").show()
                  $("#logout").hide()
                  $("#addmessage").hide()
                  $('.users').empty()
                  $('.messageslist').empty()
                  $('#logedin').text('')
                  $('#uploadpic').hide()
                }); 
          } else{ return }///
            $('.users').html(`${users.map( 
                user => `
                  <div class='user' id="${user.id}">
                      <img src= ${user.profile}>
                      <h4>${checkIfAuthor(user.blogauthor)}</h4>
                      <h4>${user.name} </h4>
                      <p> ${user.profession} </p>
                      <div class= 'divbtndel'>
                          <button  class="deluser"> del </button> 
                      </div>
                  </div>
              `).join(' ')} `)
            $('.messageslist'). html(`${

                    posts.map(post => `
                         <div class= 'post ${post.authorId}' id="post${post.id}">
                              <div class= "postcontent">
                                <img src = "${post.picture}" width="auto" alt = "picture">
                                <h4> ${post.title} </h4>
                                <p> ${post.content} </p>
                              </div>
                              <h5> Author: ${findName(post.authorId)}</h5>
                              <div class="postbuttons" >
                                <button class="addcomment" id="cadd${post.id}">add comment</button>
                                <button class="postcomments">comments</button>
                                <button class="postdel">del</button>
                                <button class="postedit">edit</button>
                                <button class="uploadpicture">add image</button>
                                  <div class="uploadPicPost">
                                    <form id="uploadPic${post.id}"  action="http://localhost:3000/picture/${post.id}" method="post" enctype="multipart/form-data" method="post">
                                      <input type="file" name="profileimg"  id="pic${post.id}" />
                                      <input type="submit" value="upload pic" class="uploadbtn">
                                    </form>    
                                  </div>
                              </div>
                              <div id="formc${post.id}" class= "formcontainer"></div>
                              <div class="comments"></div>
                                    
                        </div>
                        `
                ).join(' ')
            } `)
            messagesadded = document.querySelectorAll('.messageslist > .post > .postcontent > .postdel')
            getPostId()
            postIdmouseEnter()
            delCommentId()
            addCommentId() //add form on page for comments
          //  addComments() // api upload form to server//
          //  getBlogNames() //get names author request and blog authors
            getRequestId() // req status blog author or member
            //getPostComments(tm)
          //  updateRequestId(reqx)
            mouseUp()

               console.log(messagesadded)

            $(".user").mouseenter(function () {
                let t = $(this).attr('id')
                tu = Number(t)
                console.log(typeof tu)
                
                })
              $(".deluser").click(async function(){
                    if(tu == userloged.user.id){return}
                      await delUser(tu)
                      $(`#${tu}`).remove()
                      $("div").remove(`.${tu}`)
                })
              uploadProfilePic(iduser)
        }},
        error:  (error) => {
            console.log(error);
            return;
        }
    })
  })
}
loadPage()
function postIdmouseEnter(){
    //let tmle
    let t 
            $(".post").on('mousedown', function () {
               t = ($(this).attr('id')).slice(4)
   //             let ax = $(`#post${t}`).find('.postdel').text()
                tx = t
                console.log(t)
            })
          }
function mouseUp(){
            $('.postdel').off('click').on('click',function(){
                    delMessage(tx)
                    $(`#post${tx}`).remove()
                    console.log('dgf')
                })      
                console.log('rrrr')
         
    
    }
function getPostId(){
            $(".post").on('mouseover', function () {
                let t = ($(this).attr('id')).slice(4)
                tm = Number(t)
                $(`#post${tm}`).find('.postedit').off('click').on('click',function(){
                     editPost(tm)
                })      
                 $('.uploadpicture').off('click').click(function(){
                  //$(`post${tm}`).find
                      $(`#post${tx}`).find('.uploadPicPost').toggle()
                })
                uploadPostPicture()
                addComments()
            $(`#post${tm}`).find('.postcomments').off('click').on('click',function(){

                    $(`#post${tm}`).children(".comments").show()
                    $(`#formc${tm}`).children().hide()
                     let checkform = $(`#post${tm}`).children('.comments').children().hasClass("commentx")
                      console.log(checkform)
                      if(!checkform){
                        getPostComments(tm)
                      }else{
                         $(`#post${tm}`).children(".comments").children().remove('.commentx')
                      }
            })
              delCommentId()    

        })      
  }
async function uploadPic(){ //not used
    const token = localStorage.getItem('blogposttoken')
  //  let tm
    $.ajax({
        url: `http://localhost:3000/picture`, 
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "contentType": "application/json",
           // "Authorization": "Bearer "+ token,
        },
         data: {
          profile: $('#profileimg').val(),
        //  content: $('#mesgedit').val(),
        },
        success: function(data, status){
                  console.log(status)
                  console.log(data)
            }
        })
}

async function uploadProfilePic(x){
    $('.uploadImage').off('submit').submit(function(){
        const token = localStorage.getItem('blogposttoken')
        var file = $('#profileimg').val(); 
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
                "Authorization": "Bearer "+ token,
            },
           data: {profile: file},
         //  contentType: 'application/json',
           success: function(response){
             console.log('image uploaded and form submitted');    
             console.log(response) 
           $('.userpict').html(`<img src = "${response}" alt = "portrait">`)
          $(`#${x}`).children('img').attr('src', `${response}`)
          
           }
       });
       $('.uploadprofiles').hide('slow')
       $('#profileimg').val('')
     
         return false;
    });
  }
async function uploadPostPicture(){
  console.log('dfbfgdbdfgbf')
$(`#uploadPic${tm}`).off('submit').submit(function(){
    const token = localStorage.getItem('blogposttoken')
    var file = $(`#pic${tm}`).val(); 
    console.log(file)
     $(this).ajaxSubmit({
      headers: {
            "Accept": "application/json",
            "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
       data: {picture: file},
     //  contentType: 'application/json',
       success: function(response){
         console.log('image uploaded and form submitted');     
       }
   });
   $(`#pic${tm}`).val('')
     return false;
});
}
async function addComments(){
    $(".commentform").off('submit').submit(function(){
        const token = localStorage.getItem('blogposttoken')
        let txt = $('#commenttext').val()
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
                "Authorization": "Bearer "+ token,
            },
           data: {commenttextt: txt},
           success: function(response){
             console.log('comment uploaded and form submitted'); 
             console.log(response)  
            $(`#formc${tm}`).children().remove()

           }
       });
  //     $("#commenttext").val('')
      

         return false;
      });
}
async function getPostComments(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `http://localhost:3000/message/${x}/comments`, 
        type: 'GET',
        headers: {
            "Accept": "application/json",
            "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
        success: function(data, status){
            console.log(data)
            for(let i = 0; i < data.length; i++){
            const comment = `
                <div class= "commentx" id = "come${data[i].id}">
                    <p> ${data[i].content} </p>
                    <h5> Author: ${data[i].authorName}</h5>
                    <button type='submit' class='delcomment' id= "delc${data[i].id}" > del</button>
                </div>
              `
               $(`#post${x}`).children('.comments').off('append').append(comment).show()
            }
        }
    })
}
async function delComment(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `http://localhost:3000/message/${tm}/comments/${x}`, 
        type: 'DELETE',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
        success: function(data, status){
            console.log(data)
            console.log(status)

        }
    })
}
async function delCommentId(){
    $('.delcomment').off('click').click(function(){
      let c = ($(this).attr('id')).slice(4)
      console.log(c)
      delComment(c)
      $('')
      $(`#come${c}`).remove()
    })
}
async function addCommentId(){
  $('.addcomment').click(function(){
      let c = ($(this).attr('id')).slice(4)
       $(`#post${tm}`).children(".comments").hide()
       $(`#formc${tm}`).children().show()
       let form = `
          <form class='commentform' action="http://localhost:3000/message/${c}/comment" method="post">
            <label for= "commenttext">comment</label>
            <textarea type="text" name="commenttext" id="commenttext" rows='4' cols='40'></textarea>
            <button type='submit' class="submitcom">submit</button>
          </form>    
        `
    let checkform = $(`#formc${c}`).children().hasClass("commentform")
    if(!checkform){

          $(`#formc${c}`).append(form).show()
    }else{
          $(`#formc${c}`).children().remove()
    }
    })
}

async function getBlogNames(){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: "http://localhost:3000/user/blogrequest", 
        type: 'GET',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+token,
        },
        success: function(data, status){
          console.log(status)
          function check(x){
                    if(x){ return 'checked'}
                    else{ return }
                  }
            for(let i = 0; i < data.length; i++){
                  let xb = check(data[i].blogauthor)
                  let xr = check(data[i].requestauth)
                const user = `
                 <form id="reqd${data[i].id}" action="http://localhost:3000/user/blogrequest/${data[i].id}" method="post" >
                    <label class="membername"> ${data[i].name} : </label>
                    <label for ="memb${data[i].id}"> author </label>
                    <input type="checkbox" name="blogauthor"  id="memb${data[i].id}"  ${xb}  >
                    <label for ="memr${data[i].id}"> request </label>
                    <input type="checkbox" name="requestauth" id="memr${data[i].id}"  ${xr}  >
                    <button type='submit' class='submrequest'> submit</button>
                </form>
                `
                 $(".usersstatus").off('append').append(user)
            }
          }
      })
}
getBlogNames()

async function updateRequestId(x){
    $(`#reqd${x}`).off('submit').submit(function(){
        const token = localStorage.getItem('blogposttoken')
        let blogauthx = $(`#memb${x}:checked`).val()
        let requestauthx = $(`#memr${x}:checked`).val()
        console.log(blogauthx)
        console.log(requestauthx)
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
                "Authorization": "Bearer "+ token,
            },
          data: {
                 blogauthor: blogauthx,
                 requestauth: requestauthx
           },
           success: function(response){
             console.log('comment uploaded and form submitted'); 
             console.log(response)  

           }
       });
         return false;
      });
}
function getRequestId(){
            $(".usersstatus").children('form').off('mouseover').mouseover(function () {
                reqx = ($(this).attr('id')).slice(4)
                console.log(reqx)
                updateRequestId(reqx)
             //   let va= $(`#memb${377}:checked`).val()
              //    console.log( Boolean(va))
            })
    }

console.log(Boolean(''))
//${check(data[i].blogauthor)}
//${check(data[i].requestauth)}