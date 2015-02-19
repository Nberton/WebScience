function imgError(image) {
    image.onerror = "";
    image.src = "bird.png";
    return true;
}

$(document).ready(function(){
	var formatted_tweets=[];
	$.getJSON("tweets.json",
		function(result){
			for( i=0; i<result.length;i++){
				tweet_info = []
				image = '<img class="roundImage" src="' + result[i].user.profile_image_url + '" onerror="imgError(this)" width=30px height=30px></img>';
				formatted = "<div class='medium-12 column tweet'>"+ image + result[i].text + "</div>";
				tweet_info.push(formatted);
				if( result[i].entities.hashtags.length > 0){
					tag = "<div class='medium-12 column hashtag'>#"+result[i].entities.hashtags[0].text +"</div>";
					tweet_info.push(tag);
				}
				formatted_tweets.push(tweet_info);
			}
			//create the interval thing
			x=0;
			//pump in the first 5
			while(x < 5 && x < formatted_tweets.length){
					$("#tweets").prepend(formatted_tweets[x][0]);
					if(formatted_tweets[x].length > 1 ){
						$("#hashtags").prepend(formatted_tweets[x][1]);
					}
					x += 1;
			}

			
			setInterval(function(){ 
				if (x < formatted_tweets.length){
					$("#tweets").prepend(formatted_tweets[x][0]);
					$("#tweets").find('div:first').hide();
					if($("#tweets > div").length > 5){	
						$("#tweets").find("div:last").hide(600,function(){
							$("#tweets").find("div:last").remove();
						});
					}
					$("#tweets").find("div:first").show(600);
					//alert($("#tweets > div").length);
					if(formatted_tweets[x].length > 1 ){
						$("#hashtags").prepend(formatted_tweets[x][1]);
						$("#hashtags").find('div:first').hide();
						if($("#hashtags > div").length > 5){	
							$("#hashtags").find("div:last").hide(600,function(){
								$("#hashtags").find("div:last").remove();
							});
						}
					}
					$("#hashtags").find("div:first").show(600);
					x += 1;
				}
				; }, 3000);
			
		}
	);

});
