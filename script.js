

const btnSignup = document.querySelector('#btnSignup')
const btnlogin = document.querySelector('#btnlogin')
const btnmsg = document.querySelector('#msgbtn')
const logout = document.querySelector('#logout')
const namex = document.querySelector('#name')
const email = document.querySelector('#email')
const passw= document.querySelector('#passw')
const logemail = document.querySelector('#logemail')
const loginPassw = document.querySelector('#loginPassw')
const users = document.querySelector('.users')
const title = document.querySelector('#title')
const content = document.querySelector('#mesg')
const messageslist = document.querySelector(".messageslist")
let messagesadded = document.querySelectorAll('.messageslist > .post > .postcontent > .postdel')
const logedin = document.querySelector('#logedin')
let tm    //post/message id 
let tx
console.log(messagesadded)

$(document).ready(function(){
  $("#signup").click(function(){
    $(".adduser").slideToggle("slow")
    $('#name').val('')
    $('#email').val('')
    $('#passw').val('')
    $(".loginuser").slideUp("slow")
    $('.messagepost').slideUp('slow')
  });
});
$(document).ready(function(){
  $("#login").click(function(){
    $(".loginuser").slideToggle("slow");
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
async function signUp(){
    const data = {
         name: namex.value,
         email: email.value,
         password: passw.value
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
    }
    const text = await response.text();
    return text
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
                            <h5> Author: ${logedin.textContent} </h5>
                            <button class="postdel">del</button>
                            <button class="postedit">edit</button>
                      </div>
                  </div>
                  `
          $('.messageslist').append(postelem)         
          
        console.log(postIds)
        mouseUp()
        postIdmouseEnter()
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
function delmess(){
          $(`#post${tm}`).find('.postdel').click(function(){
                     delMessage(tm)
                     $(`#post${tm}`).remove()
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
                $(`#post${x}`).html(ef)
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
                  console.log(data)
                  if(status == 'success'){
              let postupdated = ` 
                      <div class= "postcontent"> 
                              <h4> ${data.title} </h4>
                              <p> ${data.content} </p>
                              <h5> Author:${data.authorId}</h5>
                              <button class="postdel">del</button>
                              <button class="postedit">edit</button>
                      </div>
                `
               $(`#post${x}`).html(postupdated)
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
            function findName(y){
                let us = users.find(x => x.id == y)
                 return us.name
                }
              let userloged = data.authData
              logedin.textContent = userloged.user.name
              $('.userpict').html(`<img src = "${userloged.user.profile}" width="100%" alt = "portrait">`)
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
                      <div>${user.name} </div>
                      <button  class="deluser"> del </button> 
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
                              <div class="postbuttons">
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
                            
                        </div>
                        `
                ).join(' ')
            } `)
            messagesadded = document.querySelectorAll('.messageslist > .post > .postcontent > .postdel')
            getPostId()
            postIdmouseEnter()
            mouseUp()
   
           // uploadPostPicture()
            console.log(messagesadded)
            let tu
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
        }},
        error:  (error) => {
            console.log(error);
            return;
        }
    })
  })
}
loadPage()
//getPostId()
function postIdmouseEnter(){
    //let tmle
    let t 
            $(".post").on('mousedown', function () {
               t = ($(this).attr('id')).slice(4)
        //        let at = $(this).attr(`${post.authorId}`)
                let ax = $(`#post${t}`).find('.postdel').text()
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
                console.log(tx + 'those')
                console.log('rrrr')
         
    
    }
function getPostId(){
            $(".post").on('mouseover', function () {
                let t = ($(this).attr('id')).slice(4)
                tm = Number(t)
                $(`#post${tm}`).find('.postedit').on('click',function(){
                     editPost(tm)
                })      
                  $(`#post${tm}`).find('.postedit').on('mouseup',function(){
                     editPost(tm)
                  })
                 $('.uploadpicture').off('click').click(function(){
                  //$(`post${tm}`).find
                      $(`#post${tx}`).find('.uploadPicPost').toggle()
                })
                uploadPostPicture()
        })      
  }
async function uploadPic(){
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

$('.uploadImage').submit(function(){
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
       }
   });
   $('#profileimg').val('')
     return false;
});

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
