
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

//document.onload() get categories