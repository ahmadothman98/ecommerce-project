var category_id = location.search.substring(1);
if(category_id != ''){
    loadItemsByCategoryId(category_id);
    getCategoryName(category_id);
}




///////////////////////////////////
//////////  Functions /////////////
///////////////////////////////////



function loadItemsByCategoryId(id){
    var url =  'http://127.0.0.1:8000/api/get_items_by_category/'+ id;
    axios({
        method: 'get',
        url: url
    })
    .then(function (response){
        for(let i = 0; i<response.data.items.length;i++){

            appendNewItem(response.data.items[i]);

        }
        
    });
}
function getCategoryName(id){
    var url =  'http://127.0.0.1:8000/api/get_categories/';
    axios({
        method: 'get',
        url: url
    })
    .then(function (response){
        const searchIndex = response.data.categories.findIndex((cat) => cat.id==id);
        var title = response.data.categories[searchIndex]['name'];
        title = title.charAt(0).toUpperCase() + title.slice(1);       
        document.title = title;
        document.querySelector('#cat_title').innerText = title;
        appendCategories(response.data.categories);

        
    });
}
//////////


//// new item create and  append 

function appendNewItem(item_data){
    var item_id = item_data['id'];
    var item_name = item_data['name'];
    var description = item_data['description'];
    var price = item_data['price'];
    var image = item_data['image'];
    var category_name = item_data['category_name'];
    ///

    // creating elements
    var new_item = document.createElement('a');
    new_item.href='http://127.0.0.1:8000/api/get_items/'+item_id;
    new_item.classList.add('item');

    var item_image_div = document.createElement('div');
    item_image_div.classList.add('item_img');

    var img_elem = document.createElement('img');
    img_elem.src="./assets/img/item_"+item_id+".png";

    var item_title = document.createElement('h3');
    item_name = item_name.charAt(0).toUpperCase() + item_name.slice(1);
    item_title.innerText = item_name;

    var item_desc = document.createElement('p');
    item_desc.innerText = description;
    item_desc.classList.add('desc');

    var price_elem = document.createElement('p');
    price_elem.innerText='$ '+price;
    var favorite_btn = document.createElement('img');
    favorite_btn.src="./assetes/img/favorite.png"
    favorite_btn.classList.add('favorite');
    //appending elements
    item_image_div.appendChild(img_elem);
    new_item.appendChild(item_image_div);
    new_item.appendChild(item_title);
    new_item.appendChild(item_desc);
    new_item.appendChild(price_elem);
    new_item.appendChild(favorite_btn);
    document.querySelector('#items').appendChild(new_item);
}

///////////////
////////

function appendCategories(cat_list){
    for(var i =0 ; i<cat_list.length; i++){
        var anchor_cat = document.createElement('a');
        anchor_cat.href = "./items_by_category.html?"+cat_list[i]['id'];
        anchor_cat.id="cat_"+cat_list[i]['id'];
        anchor_cat.innerText = cat_list[i]['name'];
        document.querySelector('#categs').append(anchor_cat);
    }
    var selected_cat_id = "#cat_"+category_id;
    var selected_cat_anchor = document.querySelector(selected_cat_id);
    selected_cat_anchor.classList.toggle('selected');
}
