loadCategories();
function loadCategories(){
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/get_categories'
    })
    .then(function (response){
        for(let i = 0; i<response.data.categories.length;i++){
            //appennd categories
            var cat_name = response.data.categories[i]['name'];
            var cat_image = response.data.categories[i]['image'];
            var cat_id = response.data.categories[i]['id'];
            var category = "<img src=\"./assets/img/index.jpg\" alt=\"cat_name\">\n<h3>"+cat_name+"</h3>"
            var new_categ = document.createElement('a');
            new_categ.href = "./items_by_category.html?"+cat_id;
            new_categ.classList.add('category');
            new_categ.setAttribute('id' , "cat_"+cat_id);
            new_categ.innerHTML = category;
            document.querySelector('#categories_list').append(new_categ);
            //addCategoryForItems(cat_name,cat_id); // used for selecting category in item addition
            var cat_element_id = "#cat_"+cat_id;

        console.log(response.data.categories);
        }
    })

}


