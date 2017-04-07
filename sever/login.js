function onRequest(request, response, modules) {
        var userId1 = request.body.user_id;
        var userKeywords = request.body.userKeywords;
        var Bql = modules.oBql;
        Bql.exec(
            {"bql":"select keyword from u_user where userId= '"+userId1+"' "},    
            function(err,data){
                data = JSON.parse(data);
                if(data.results.length==0){
                  response.send("此账号不存在");  
                }else{
                    if(data.results[0].keyword == userKeywords){
                        response.send('登录成功'); 
                    }else{
                         response.send('密码错误');
                    }
                }
            }
        );