$( document ).ready(function() {
    $(".parent-spinner").fadeOut(1000)
 });
 function getId(id){
     document.getElementById('postId').value=id
     console.log(id)
 }
 function edit(id){
    document.getElementById('postIdd').value=id

    let title =document.getElementById('titleee'+id).innerText
    let body =document.getElementById('borrdy'+id).innerText
    document.getElementById('inputTit').value=title
    document.getElementById('inputBody').value=body

    console.log(title,body)
}