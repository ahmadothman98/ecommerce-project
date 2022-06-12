axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/get_categories'
})
.then(function (response){
    for(let i = 0; i<response.data.categories.length;i++){
        //appennd categories
        var cat_name = response.data.categories[i]['name'];
        var cat_image = response.data.categories[i]['image'];
        var category = "<div id=\"cat_"+response.data.categories[i]['id']+"\" class=\"category\">\n<img src=\""+cat_image+"\" alt=\"cat_name\"\>\n<h3 id=\"cat_name_"+response.data.categories[i]['id']+"\">"+cat_name+"</h3>\n</div><hr>"
        $('#categs_list').append($(category));
        console.log(response.data.categories)
    }
})

var selected_tab = 1;
$('#categs_nav').click(function(){
    $(this).addClass('active');
    $('#users_nav').removeClass('active');
    $('#items_nav').removeClass('active');
    $('#2').addClass('hidden');
    $('#3').addClass('hidden');
    $('#1').removeClass('hidden');
    
    //console.log(selected_tab)

});
$('#items_nav').click(function(){
    $(this).addClass('active');
    $('#users_nav').removeClass('active');
    $('#categs_nav').removeClass('active');
    $('#1').addClass('hidden');
    $('#3').addClass('hidden');
    $('#2').removeClass('hidden');

    //console.log(selected_tab)

});
$('#users_nav').click(function(){
    $(this).addClass('active');
    $('#categs_nav').removeClass('active');
    $('#items_nav').removeClass('active');
    $('#1').addClass('hidden');
    $('#2').addClass('hidden');
    $('#3').removeClass('hidden');

    //console.log(selected_tab)
});

$('#add_cat_btn').click(function(){
    $('#add_cat_form').toggleClass('hidden');
})
$('#add_item_btn').click(function(){
    $('#add_item_form').toggleClass('hidden');
})
////////

////Adding new Category
$('#submit_cat_btn').click(function(){
    var name = $("#new_cat_name").val();
    var image = $("#new_cat_image").val();
    addNewCategory(name,image);
})
//////////


function addNewCategory(name,image){
    var data = {
        'name':name,
        'image':image
    };
    console.log(data);
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/add_category',
        headers: {
            Authorization:`Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU0OTk2ODM2LCJleHAiOjE2NTUwMDA0MzYsIm5iZiI6MTY1NDk5NjgzNiwianRpIjoic3hMbktRMDFyOWw0WkQ4OSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.43F07Waa7jdg7U8jXHZ_al-CcSxSHtNK9pJVOCnNNXk"}`,
        },
        data:data
    })
    
}