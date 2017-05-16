import Raven from 'raven-core';
import $ from 'jquery';

Raven.methods({
    events() {
    	/* 
    	    @desc: Modal popup interactive box functionality; Definition injection from HTTP call; Page navigation.
			when user clicks on an image card on the specified collection id's,
			( Do I have a Juvenile Record & How can my Record get in the way of my Future ) 
			when text is hyperlinked to definition page, the definition is injected into 
			the modal and will appear on mouse hover.   
    	*/   
    
		const data = (url) => {
			return $.ajax({
	            data: {
	                format: "json"
	            },
	            dataType: "jsonp",
	            url: url,
	            success: (result) => {
	                return result;
	            },
	            error: (error) => {
	                console.error(error);
	            }
	        });
	    };

        $('#collection-5910b1cdebbd1ad89d210bbb .sqs-block-image, #collection-5910b70e8419c210341c296b .sqs-block-image').on("click", (e) => {
        	//inject content from image into modal
            const content = $(e.currentTarget).find('.image-card-wrapper').clone();

            $('#modal .modal-content').html(content);
            $('#modal').addClass('active');

            //look for links on the page and append definition
            const links = $(content).find('a');

            $(links).on("click", (e) => {
                e.preventDefault();
            });
            $.each(links, (i, item) => {
                const href = $(item).attr("href");

                $.when( data(href) ).done((response) => {
                    $(item).addClass("has-definition");

                    $(item).on("click", (e) => {
                        e.preventDefault();
                    });
                    $(item).append('<div class="definition">' + response.mainContent + '</div>');

                });
            });
        });

        //close modal functionality
        $('#modal, .modal-close').on("click", () => {
            $('#modal').removeClass('active');
            $('#modal .modal-content').html("");
        });
        $('#modal .modal-content').on("click", (e) => {
            e.stopPropagation();
        });

        //navigate to url on image link
        $('#collection-5910b6f329687ff6d04cf12f .design-layout-stack').on("click", (e) => {
            e.preventDefault();
            const url = $(e.currentTarget).find('.image-overlay').attr('href');

            window.location = url;
        });
    }
});
