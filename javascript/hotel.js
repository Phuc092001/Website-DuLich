$(document).ready(function() {

    createTemplate(hotel_data);

    $('header, section, footer').addClass('wow animate__fadeIn')
    $('section.resort > div.content > div.resort-items > figure').addClass('wow animate__flipInY')
    $('section.hotels > div.content > div.h-items > figure').addClass('wow animate__zoomIn')

    $('.click').click(function() {
        alert('Vui lòng đăng nhập để thực hiện thao tác!')
    })

    wow = new WOW ({
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 0,
        mobile: true,
        live: true
    })    

    wow.init();

    var li1, li2, li3;

    $('#category > ul > li > span').click(function() {
        var category = $(this).text()
        li1 = category

        $('#category > span').text(category)
    })

    $('#area > ul > li > span').click(function() {
        var area = $(this).text()
        li2 = area

        $('#area > span').text(area)
    })

    $('#price > ul > li > span').click(function() {
        var price = $(this).text()
        li3 = price

        $('#price > span').text(price)
    })
    
    $('#look').click(function() {
    
        var newTemplate = [...hotel_data];

        if(li1) {
            newTemplate = newTemplate.filter(nt => nt.category === li1);

            if(li2){
                newTemplate = newTemplate.filter(nt => nt.location === li2 );
                if(li3) {
                    if(li3.includes('thấp đến cao'))
                    {
                        newTemplate.sort((a, b) => a.price - b.price)
                    }
                    else
                        newTemplate.sort((a, b) => b.price - a.price)

                    createTemplate(newTemplate);

                    $('button.click').click(function() {
                        alert('Vui lòng đăng nhập để thực hiện thao tác!')
                     })
        
                    display(li1);

                    $('figure').css('animation', 'flash 1s ease-out')
                }
                else
                    alert('Vui lòng chọn đầy đủ!')   
            }
            else
                alert('Vui lòng chọn đầy đủ!')
        }
        else
            alert('Vui lòng chọn mục cần tìm!')
    });
})

const createRating = (rating) => {
    var output = ''
    for(var i = 0; i < rating; i++) {
        output+= `<i class='fas fa-star'></i>`
    }
    return output
}

const createTemplate = (arr) => {

    var outputResort = '', outputHotel = ''
    $.each(arr, function(index, value) {
        
        if(value.category === 'Khu nghỉ dưỡng') {
            outputResort += `<figure>
                            <img src=${value.img} alt=''>
                            <figcaption class='flex'>
                                <div>
                                    <div class='r-title'>
                                        <p><i class='fas fa-map-marker-alt'></i> ${value.location}</p>
                                        <div class='flex'>
                                            <h3>${value.name}</h3>
                                        </div>
                                    </div>
                                    <div class='r-info'>
                                        <div>
                                            <div class='rating'>
                                                ${createRating(value.rating)}
                                            </div>
                                            <p>Giá: ${value.textPrice} VND</p>
                                        </div>
                                        <div class='btn'>
                                            <button class='click'>Đặt ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>`
        }
        else if(value.category === 'Khách sạn') {
            outputHotel += `<figure>
                        <div class='flex'>
                            <img src=${value.img} alt=''>
                            <figcaption>
                                <div class='h-title'>
                                    <p><i class='fas fa-map-marker-alt'></i> ${value.location} - ${value.address}</p>
                                    <h3>${value.name}</h3>
                                </div>
                                <div class='h-info'>
                                    <div>
                                        <div class='rating'> ${createRating(value.rating)} </div>
                                        <p>Giá: ${value.textPrice} VND</p>
                                    </div>
                                    <div class='btn'>
                                        <button class='click'>Đặt ngay</button>
                                    </div>
                                </div>
                            </figcaption>  
                        </div>
                    </figure>`
        }
    });
    
    $('.resort-items').html(outputResort);
    $('.h-items').html(outputHotel);
}

const display = (request) => {
    if(request === 'Khu nghỉ dưỡng') {
        $('.hotels').css('display', 'none')
        
        $('.resort').css('display', 'block')
    }
    else if(request === 'Khách sạn'){
        $('.resort').css('display', 'none')
        
        $('.hotels').css('display', 'block')
    }
}