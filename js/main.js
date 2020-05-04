$(document).ready(function(){
   
    
    
    $('.btn').on('click',function(){
        let value = $('.task-input').val();


        if(!value){
            alert('Заполните поле!')
            return
        }


        const taskObj = {
            task: value
        };

        setItemToStorage(taskObj);
        renderData()
        
        $('.task-input').val('');
    })

    const setItemToStorage = taskObj =>{
        if(!localStorage.getItem('tasks-data')){
            localStorage.setItem('tasks-data','[]')
        }

        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'));

        storageTaskData.push(taskObj)

        localStorage.setItem('tasks-data',JSON.stringify(storageTaskData));
    }

    const renderData = (...arguments) =>{
        let data = JSON.parse(localStorage.getItem('tasks-data'))

        if(!data){
            return
        }
        $('.task-list').html('');

        data.forEach((item) => {
            $('.task-list').append(`<li>
            <div class="new-text">${item.task}</div>
            <button class="btn-change"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button class="btn-delete">
            
            <i class="fa fa-window-close" aria-hidden="true"></i></button>
            </li>
            `)
        });
        
    }

    renderData();

    $('body').on('click','.btn-delete', function(){
        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
        let index = $(this).parent().index();

        storageTaskData.splice(index,1);

        localStorage.setItem('tasks-data',JSON.stringify(storageTaskData))

        renderData();

    })

    $('body').on('click','.btn-change',function(){
       // $('.new-inp').attr('placeholder',value);
        $('.btn-change').removeClass('buttoned');
        $(this).addClass('buttoned');
        $('.new-inp').attr('placeholder','Введите новый текст')
        

        $('.main-modal').fadeIn();
        // $('.main-modal').addClass('disabled');
        
        $('.close-modal').on('click',function() { 
            $('.main-modal').fadeOut();
            $('.new-inp').val('');
        });

        

        

    })

    $('body').on('click','.ok-btn',function(){
        // $('.buttoned').parent('li').children('div .new-text').text($('.new-inp').val())
        if($('.new-inp').val()){
            const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
            let index = $('.buttoned').parent().index();

            
            storageTaskData.forEach((element,i) =>{
                if(i===index){
                    element.task = $('.new-inp').val()
                }
            })

            localStorage.setItem('tasks-data',JSON.stringify(storageTaskData))
            let a = storageTaskData
        
            
            renderData();
            $('.new-inp').val('');
            $('.main-modal').fadeOut(); 
        }   
        else{
            alert("Заполните поле")
        }
        
    })



    $('body').on('click','.new-text',function(){

        // const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
         
        


        // storageTaskData.forEach((element,i) =>{
        //     if(i===index){
        //         console.log(element.task);
                
                //$(this).toggleClass('completed')

                
                $(this).toggleClass('completed')
                //console.log(item);   
                // $(storageTaskData).eq(i).parent().children('.new-text').toggleClass('completed');
                
                // $(element).toggleClass('completed');
        //     }
        // })

        // localStorage.setItem('tasks-data',JSON.stringify(storageTaskData))

        // renderData();
      
    })




})