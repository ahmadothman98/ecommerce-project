loadCategories();
loadItems();
document.querySelector('#second').classList.add('hidden');
document.querySelector('#first').classList.remove('hidden');
stayOnWindow();
var categories_list = [];
//to stay on the same window after refresh

document.querySelector('#categs_nav').addEventListener('click',function(){
    categsNavClicked();
    //console.log(selected_tab)

});
document.querySelector('#items_nav').addEventListener('click',function(){
    itemsNavClicked();
    //console.log(selected_tab)

});

document.querySelector('#add_cat_btn').addEventListener('click',function(){
    document.querySelector('#add_cat_form').classList.toggle('hidden');
})
document.querySelector('#add_item_btn').addEventListener('click',function(){
    document.querySelector('#add_item_form').classList.toggle('hidden');
})
////////

////Adding new Category
document.querySelector('#submit_cat_btn').addEventListener('click',function(){
    var name = document.querySelector("#new_cat_name").value;
    var image = document.querySelector("#new_cat_image").value;
    addNewCategory(name,image);
})
/////////////////////////////////////////////

/////Adding new item
document.querySelector('#submit_item_btn').addEventListener('click',function(){
    var name = document.querySelector('#item_name').value;
    var price = document.querySelector('#item_price').value;
    var description = document.querySelector('#item_description').value;
    var image = document.querySelector('#item_img').value;
    var category_id = document.querySelector('#category_selector').value;
    addNewItem(name,description,price,image,category_id)
})


///////////////////////////

////////Functions//////////

//////////////////////////



////////// add category function
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
            Authorization:`Bearer ${localStorage.getItem('access_token')}`,
        },
        data:data
    }).then(function(){
        location.reload();
    })
}
//////////////////////////////////////////////////////////


//// Load Categories function
function loadCategories(){
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/get_categories'
    })
    .then(function (response){
        console.log(response.data)
        console.log("data categ")
        for(let i = 0; i<response.data.categories.length;i++){
            //appennd categories
            var cat_name = response.data.categories[i]['name'];
            var cat_image = response.data.categories[i]['image'];
            var cat_id = response.data.categories[i]['id'];
            var category = "<div id=\"cat_"+response.data.categories[i]['id']+"\" name = \""+response.data.categories[i]['name']+"\" class=\"category\">\n<img src=\"./../src/img/"+cat_image+"\" alt=\"cat_name\"\>\n<h3 id=\"cat_name_"+response.data.categories[i]['id']+"\">"+cat_name+"</h3>\n</div><hr>"
            var new_categ = document.createElement('div');
            new_categ.innerHTML = category;
            document.querySelector('#categs_list').append(new_categ);
            addCategoryForItems(cat_name,cat_id); // used for selecting category in item addition
            //console.log(response.data.categories);
        }
    })
}
//////////////////////////////////////////////////////////


////////// add item function
function addNewItem(name,description,price,image,category_id){
    var data = {
        'name':name,
        'description':description,
        'price':price,
        'image' : image,
        'category_id' : category_id
    };
    console.log(data);
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/add_item',
        headers: {
            Authorization:`Bearer ${localStorage.getItem('access_token')}`,
        },
        data:data
    }).then(function(){
        location.reload();
    })
}
//////////////////////////////////////////////////////////



//// Load Items function
function loadItems(){
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/get_items'
    })
    .then(function (response){
        console.log(response.data.items);
        for(let i = 0; i<response.data.items.length;i++){
            //appennd items
            var item_name = response.data.items[i]['name'];
            var price = response.data.items[i]['price'];
            var description = response.data.items[i]['description'];
            var category_name = response.data.items[i]['category_name'];
            var item_image = response.data.items[i]['image'];
            var item = "<div id=\"item_"+response.data.items[i]['id']+"\" class=\"item\">\n<img src=\"./../src/img/"+item_image+"\" alt=\"item_name\"\>\n<h3 id=\"item_name_"+response.data.items[i]['id']+"\">"+item_name+"</h3>\n<h4>$ "+price+"</h4>\n<p>"+category_name+"</p></div><hr>"
            var new_item = document.createElement('div');
            new_item.innerHTML = item;
            document.querySelector('#items_list').append(new_item);
        }
    })
}
/////////////////////////////////////////////////////

//////add item function
function addItem(name,description,price,image,categ_id){
    var data = {
        'name':name,
        'description' : description,
        'price' : price,
        'image':image,
        'category_id' : categ_id
    };
    console.log(data);
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/add_item',
        headers: {
            Authorization:`Bearer ${localStorage.getItem('access_token')}`,
        },
        data:data
    }).then(function(){
        location.reload();
    })
}
//////////////////////////

////stay on same window after refresh or adding categs or items
function stayOnWindow(){
    if(localStorage.getItem('selected') === null){
        localStorage.setItem('selected',0);
    }
    var selected = localStorage.getItem('selected');
    if(selected === '0'){//categories tab was selected
        categsNavClicked();
    }
    if(selected === '1'){//items tab was selected
        itemsNavClicked();
    }
}

//////////////////////////////////////////////////////////////


////////////// show categories hide items
function categsNavClicked(){
    document.querySelector('#categs_nav').classList.add('active');
    document.querySelector('#items_nav').classList.remove('active');
    document.querySelector('#second').classList.add('hidden');
    document.querySelector('#first').classList.remove('hidden');
    localStorage.setItem('selected',0);
}
/////////////////////////////////////////


////// show items hide categories
function itemsNavClicked(){
    document.querySelector('#items_nav').classList.add('active');
    document.querySelector('#categs_nav').classList.remove('active');
    document.querySelector('#first').classList.add('hidden');
    document.querySelector('#second').classList.remove('hidden');
    localStorage.setItem('selected',1);
}
/////////////////////////////////

/////////// add categ names to select menu in item form
function addCategoryForItems(name,id){
    var select_list = document.querySelector('#category_selector');
    var new_categ = document.createElement("option");
    new_categ.value = id;
    new_categ.text = name;
    select_list.add(new_categ);
}
///////////////////////////////////////////////////////