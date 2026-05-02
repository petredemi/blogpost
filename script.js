
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
let loggeduser  //logged user id which will be blog author
let loggeduseremail
let au   // get post class which is author 
let blogauthorright // true or false
let sessionexpire
console.log(location.href)
//window.location.reload(false)
 function addDate(d){
                let day = new Date(d.createdAt)
                let month = ['null','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                let dd = day.getDate()
                let m = day.getMonth()
                let mm = month[m]
                let yy = day.getFullYear()
                let hh = day.getHours()
                let min = day.getMinutes()
            //    console.log(day.getUTCDate())
                return dd+'.'+ mm + '.'+ yy + '  ' + hh + ':'+ min 
              }

$(document).ready(function(){
    $('.app').click(function(){
      if(sessionexpire != undefined){
        let nowdateseconds = new Date().getTime() - 10
        let expire = sessionexpire + '000'
        if(Number(expire) < nowdateseconds){
          localStorage.removeItem('blogposttoken')
          location.reload()         
           console.log('session expired'
           )
        }else{
            $("#login").css('display', 'none')
            $("#signup").css('display', 'none')
            $("#addmessage").show()
            $("#logout").show()
            $("#uploadpic").show()
          console.log('session active')
        }
      }
    })
  })

 /*if(localStorage.getItem('blogposttoken')){ /// iduser != undefined){//
        $("#login").css('display', 'none')
        $("#signup").css('display', 'none')
        $("#addmessage").show()
        $("#logout").show()
        $("#uploadpic").show()
    }
        */
/*$(document).ready(function(){
  if(localStorage.getItem('blogposttoken')){ /// iduser != undefined){//
        $("#login").css('display', 'none')
        $("#signup").css('display', 'none')
        $("#addmessage").show()
        $("#logout").show()
        $("#uploadpic").show()
    } */
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

$(document).ready(function(){
  $("#login").click(function(){
    $(".loginuser").slideToggle("slow").css('display', 'flex');
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
    if(!blogauthorright){return}
    $(".messagepost").slideToggle('slow').css('display', 'flex');
    $('#title').val('')
    $('#mesg').val('')
    $(".loginuser").slideUp("slow");
    $(".adduser").slideUp("slow")
    $(".uploadprofiles").slideUp("slow")
  });
});
$(document).ready(function(){
  $("#msgbtn").click(function(){
    $(".messagepost").slideUp();
  });
});

$(document).ready( function(){
   $('#uploadpic').click(function(){
       // if(!blogauthorright){return}
        $('.uploadprofiles').slideToggle('').css('display', 'flex')
        $(".messagepost").slideUp();
   })

 console.log($('h3').text())
})
$(document).ready(function(){
  $("#btnSignup").click(function(){
    $(".adduser").slideUp("slow");
  });
});
$(document).ready(function(){
     $("#logout").click(function(){
        localStorage.removeItem('blogposttoken')
          location.reload(true)
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
    const response = await fetch('https://myblog-62pt.onrender.com/user', {
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
    console.log(authorreq.checked)
    //if ( x == undefined ){return}
    localStorage.setItem("blogposttoken", x.token)
      location.reload()
      //  await getBlogNames()
      //  await loadPage()
})
async function authorsPage(){
        const token = localStorage.getItem('blogposttoken')
        const response = await fetch('https://myblog-62pt.onrender.com/user', {
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${token}`,
          },
        });
      const text = await response.text();
      const data = JSON.parse(text)
      let userloged = data.authData
      logedin.textContent = userloged.user.name
    //  if(userloged){
    //      $("#login").hide()
    //      $("#signup").hide()
    //      $("#addmessage").show()
    //      $("#logout").show()
    //  } else{ return }
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
    const response = await fetch('https://myblog-62pt.onrender.com/log-in', {
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
   if( x.token == undefined){
      return
  }
   localStorage.setItem("blogposttoken", x.token)
  // await getBlogNames()
   //await loadPage()
    location.reload()
})

async function postMessage(){
      const token = localStorage.getItem('blogposttoken')
        const data = {
             title: title.value,
             content: content.value,
          }
        const response = await fetch('https://myblog-62pt.onrender.com/message',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
           },
          body: JSON.stringify(data)
        });
         let text = await response.text()
         console.log(text)
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
                            <img src = "./picture/templatepicture.jpg" width="auto" alt='blog picture'> 
                            <h4>${textx.title}</h4>
                            <p> ${textx.content} </p>
                      </div>
                      <h5> Author: ${logedin.textContent} </h5>
                      <div class= 'pdate'>posted on: ${addDate(textx)} </div>
                      <div class="postbuttons">
                            <button class="addcomment" id="cadd${textx.id}">add comment</button>
                            <button class="postcomments">comments</button>
                            <button class="postdel">del</button>
                            <button class="postedit">edit</button>
                            <button class="uploadpicture">add image</button>
                            <div class="uploadPicPost">
                                  <form id="uploadPic${textx.id}"  action="https://myblog-62pt.onrender.com/picture/${textx.id}" method="post" enctype="multipart/form-data" method="post">
                                    <input type="file" name="profileimg"  id="pic${textx.id}" />
                                    <input type="submit" value="upload pic" class="uploadbtn">
                                  </form>    
                            </div>
                      </div>
                      <div id="formc${textx.id}" class= "formcontainer"></div>
                      <div class="comments"></div>

                  </div>
                  `
          $('.messageslist').append(postelem)
        //  $('button').show('postdel, postedit, uploadpicture')         
          
        console.log(postIds)
        mouseUp()
        postIdmouseEnter()
        getPostId()
        hideButtons()
     
        console.log(messagesadded)
        title.value = ''
        content.value = ''
})
async function delUser(x){
    const token = localStorage.getItem('blogposttoken')
    const response = await fetch(`https://myblog-62pt.onrender.com/user/${x}`, {
    method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
       },
    });
    const text = await response.text();
    console.log(text)
    console.log(JSON.parse(text))
   if(JSON.parse(text) == 'success'){
        $(`#${x}`).remove()
        $("div").remove(`.${x}`)
        localStorage.removeItem('blogposttoken')
        location.reload(true)
        console.log(JSON.parse(text))
    }else if(JSON.parse(text) == 'user deleted'){
      $(`#${x}`).remove()
      $("div").remove(`.${x}`)
      $(`#reqd${x}`).remove()
        console.log(JSON.parse(text))

    }
}
async function delMessage(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `https://myblog-62pt.onrender.com/message/${x}`, 
        type: 'DELETE',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
        success: function(data, status){
            console.log(status)
            console.log(data)
            if (data == 'denied'){return}
             $(`#post${x}`).remove()

        }
    })
}
async function editPost(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `https://myblog-62pt.onrender.com/message/${x}`, 
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
        url: `https://myblog-62pt.onrender.com/message/${x}`, 
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
        url: 'https://myblog-62pt.onrender.com', 
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
          let iduser= data.authData.user.id  //id user logged
          loggeduser = iduser // logged user with blog author id
          loggeduseremail = data.authData.user.email
          blogauthorright = data.authData.user.blogauthor
          let authuser = data.authuser // authentificated user profile picture id and email
         console.log(iduser)
          sessionexpire = data.authData.exp
          
            function findName(y){
                let us = users.find(x => x.id == y)
                 return us.name
                }
            function findUrl(y){
                let us = users.find(x => x.id == y)
                if( us.profile == undefined){
                  return './picture/profileimg.jpg'
                }
                 return us.profile
                }
            function checkIfAuthor(x){
              if(x.email == 'petrudem@yahoo.com'){
         //       $(`#${x.id}`).css('background-color','deepskyblue')
                return 'blog administrator'
              }
              else if(x.blogauthor == false){ return 'blog follower'}
              else if(x.blogauthor == true){return 'blog author'}
            }
            function profilePic(x){
                if (x.profile == null){
                    return 'picture/profileimg.jpg'
                }else {
                    return x.profile
            //       return  `<img src = "${x.profile}" alt = "portrait">`
                }
            }
            function authUserPic(x){
                if (x.profile == null){
                    return '<div></div>'
                }else {
                   return  `<img src = "${x.profile}" alt = "portrait">`
                }
            }
            function postPic(x){
                if (x.picture == null){
                    return './picture/templatepicture1.jpg'
                }else {
                    return x.picture 
                }
            }
            //  console.log(findUrl(iduser))
              logedin.textContent = data.authData.user.name
            //  $('.userpict').html(`<img src = "${authuser.profile}"  alt = "portrait">`)
             $('.userpict').html(`${authUserPic(authuser)}`)
            
          if(localStorage.getItem('blogposttoken')){ /// iduser != undefined){//
              $("#login").css('display', 'none')
              $("#signup").css('display', 'none')
              $("#addmessage").show()
              $("#logout").show()
              $("#uploadpic").show()
              $("#logout").click(function(){
                localStorage.removeItem('blogposttoken')
                  location.reload()
                }); 
          } else{ return }///
            $('.users').html(`${users.map( 
                user => `
                  <div class='user' id="${user.id}">
                      <img src= ${profilePic(user)}>
                      <h4>${checkIfAuthor(user)}</h4>
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
                                <img src = "${postPic(post)}" width="auto" alt = "picture">
                                <h4> ${post.title} </h4>
                                <p> ${post.content} </p>
                              </div>
                              <div class="authdate">
                                <div class= 'pdate'>posted on: ${addDate(post)} </div>
                                <h5> Author: ${findName(post.authorId)}</h5>
                              </div>
                              <div class="postbuttons" >
                                <button class="addcomment" id="cadd${post.id}">add comment</button>
                                <button class="postcomments">comments</button>
                                <button class="postdel">del</button>
                                <button class="postedit">edit</button>
                                <button class="uploadpicture">add image</button>
                                  <div class="uploadPicPost">
                                    <form id="uploadPic${post.id}"  action="https://myblog-62pt.onrender.com/picture/${post.id}" method="post" enctype="multipart/form-data" method="post">
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
           // $(`.${loggeduser}`).find('.uploadpicture').hide()
           $('.messageslist').show()
           if(loggeduseremail == 'petrudem@yahoo.com'){
                  $('.requestsform').show()
            }
                $('#1').css('background-color', 'deepskyblue')
                $('.messageslist').show()
        //    }
            getPostId()
            postIdmouseEnter()
            delCommentId()
         //   getRequestId() // req status blog author or member
            mouseUp()
            hideButtons()
            getRequestId() // req status blog author or member
               console.log(messagesadded)
            $(".user"). off('mouseover').mouseover(function () {
                let t = $(this).attr('id')
                tu = Number(t)
                $(".deluser").off('click').click(async function(){
                    await delUser(tu)
                })                
            })
           uploadProfilePic(iduser)
        }},
        error:  (error) => {
           // location.reload(true)
            console.log(error + ' errors')
            return;
        }
    })
  })
}
loadPage()
function hideButtons(){
      $(`.${loggeduser}`).find('.uploadpicture').show()
      $(`.${loggeduser}`).find('.postdel').show()
      $(`.${loggeduser}`).find('.postedit').show()
      if(loggeduseremail =='petrudem@yahoo.com'){
          $('.deluser').show()
          $('.postdel').show()
      }else{
          $(`#${loggeduser}`).find(('.deluser')).show()
      }
      console.log( loggeduser, au)
      console.log(loggeduser + '' + loggeduseremail)
   //   }
}
//hideButtons()
function postIdmouseEnter(){
    //let tmle
      let t 
            $(".post").on('mousedown', function () {
            t = ($(this).attr('id')).slice(4)
   //       let ax = $(`#post${t}`).find('.postdel').text()
            tx = t
                console.log(t)
          })
          }
function mouseUp(){
            $('.postdel').off('click').on('click',function(){
                    delMessage(tx)
                  //  $(`#post${tx}`).remove()
                    console.log('dgf')
                })      
                console.log('rrrr')
         
    
    }
function getPostId(){
            $(".post").on('mouseover', function () {
                let t = ($(this).attr('id')).slice(4)
                let x = $(this).attr('class') // get post id author from class
                au = Number(x.slice(5))
                tm = Number(t)
                console.log(au , loggeduser)
                $(`#post${tm}`).find('.postedit').off('click').on('click',function(){
                     editPost(tm)
                })
    //          if( loggeduser === au){  //hide elements not alloud for active user
    //                  $(`.${au}`).find('.uploadpicture').hide()
   //              }
              if( loggeduser === au){ 
                  $(`#post${tm}`).find('.uploadpicture').off('click').on('click',function(){
                      $(`#post${tm}`).find('.uploadPicPost').slideToggle('slow')
                      uploadPostPicture()
                  })
                }

                addCommentId()
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
        url: `https://myblog-62pt.onrender.com/picture`, 
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
$(`#uploadPic${tm}`).submit(function(){
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
            $(`#post${tm}`).find('img').attr('src', `${response}`)
           console.log(response)
       }
   });
   $('.uploadPicPost').hide('slow')
   $(`#pic${tm}`).val('')
     return false;
});
}
//uploadPostPicture()
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
        url: `https://myblog-62pt.onrender.com/message/${x}/comments`, 
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
                <div class= "commentx auth${data[i].authorId}" id = "come${data[i].id}">
                    <p> ${data[i].content} </p>
                    <div class= "authanddate">
                        <div class="msgdate">${addDate(data[i])} </div>
                        <h5> Author: ${data[i].authorName}</h5>
                    </div>
                    <div class='deldiv'>
                        <button type='submit' class='delcomment' id= "delc${data[i].id}"> del</button>
                    </div>
                </div>
              `
               $(`#post${x}`).children('.comments').off('append').append(comment).show()
                let comx = $('.commentx').attr('class')
                $(`.auth${loggeduser}`).find('button').show()
              //  $(`.${loggeduser}`).children('.comments').find('button').show()
                 if(loggeduseremail =='petrudem@yahoo.com'){
                            $('.delcomment').show()
                }
            }
        }
    })
}
async function delComment(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `https://myblog-62pt.onrender.com/message/${tm}/comments/${x}`, 
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
  $('.addcomment').off('click').click(function(){
      let c = ($(this).attr('id')).slice(4)
       $(`#post${tm}`).children(".comments").hide()
       $(`#formc${tm}`).children().show()
       let form = `
          <form class='commentform' action="https://myblog-62pt.onrender.com/message/${c}/comment" method="post">
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
        url: "https://myblog-62pt.onrender.com/user/blogrequest", 
        type: 'GET',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+token,
        },
        success: function(data, status){
          function check(x){
                    if(x){ return 'checked'}
                    else{ return }
                  }
          //   $(".usersstatus").off('append').append(' <h4 style="margin: 5px;"> Blog authors and members</h4> ')
            for(let i = 0; i < data.length; i++){
                  let xb = check(data[i].blogauthor)
                  let xr = check(data[i].requestauth)
                const user = `
                 <form id="reqd${data[i].id}" class="requser" action="https://myblog-62pt.onrender.com/user/blogrequest/${data[i].id}" method="post" >
                    <label class="membername"> ${data[i].name} : </label>
                    <label for ="memb${data[i].id}"> author </label>
                    <input type="checkbox" name="blogauthor"  id="memb${data[i].id}"  ${xb}  >
                    <label for ="memr${data[i].id}"> request </label>
                    <input type="checkbox" name="requestauth" id="memr${data[i].id}"  ${xr}  >
                    <button type='submit' class='submrequest'> submit</button>
                </form>
                `
             //    $(".usersstatus").off('append').append(user)
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
        console.log(blogauthx + 'ddd')
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
 async function getRequestId(){
  console.log('requests')
            $('.requestsform').find('form').mouseover(function (){
                reqx = $(this).attr('id').slice(4)
            
                updateRequestId(reqx)
            })
   }
