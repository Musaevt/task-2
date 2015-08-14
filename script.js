/**
 * Ðåàëèçàöèÿ API, íå èçìåíÿéòå åå
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };
    var new_url=url;
     setTimeout(function () {
        var result = RESPONSES[new_url];
        if (!result) {
            return callback('Unknown url');
        }
        result['url']=new_url;
        callback(null, result);
    }, Math.round(Math.random * 1000));
}
 
/**
 * Âàøè èçìåíåíèÿ íèæå
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = [];


    var callback = function (error, result) {
        responses[result['url']] = result;
        var l = [];
        for (K in responses)
            l.push(K);
        if (l.length == 3) {
            var c = [], cc = [], p = 0;
            for (i = 0; i < responses['/countries'].length; i++) {
                if (responses['/countries'][i].continent === 'Africa') {
                    c.push(responses['/countries'][i].name);
                }
            }
 
            for (i = 0; i < responses['/cities'].length; i++) {
                for (j = 0; j < c.length; j++) {
                    if (responses['/cities'][i].country === c[j]) {
                        cc.push(responses['/cities'][i].name);
                    }
                }
            }
 
            for (i = 0; i < responses['/populations'].length; i++) {
                for (j = 0; j < cc.length; j++) {
                    if (responses['/populations'][i].name === cc[j]) {
                        p += responses['/populations'][i].count;
                    }
                }
            }
 
            console.log('Total population in African cities: ' + p);
        }
    };
 for (i = 0; i < 3; i++) 
      getData(requests[i], callback);


var message="Для проверки числености населения страны(код 1), города(код 2) введите код и через пробел название страны/города";
var req=window.prompt(message),
    req_arr=(req!=null)?req.split(" "):[],
    req_key=Number.parseInt(req_arr[0]),
    req_name=req_arr[1],
    error="";

if(req_key=== NaN||req_name===undefined)
    error+="Запрос неврно задан\n";
if(!Number.isInteger(req_key)||!(req_key>0&&req_key<3))
    error+="Неверно указан код\n"; 

         
if(error=="")
    {
        switch(req_key){
                case(1):  get_country_info(req_name); break;
                case(2):  get_city_info(req_name);    break;
                default:break;
        }
    }
else
    alert(error);



function get_country_info(country){
    var url="/countries";
    var callback=function(error,result) {
        var in_list=false;
    result.forEach(function(element) {
             if(country==element.name) 
             {
                 get_population(element.name);in_list=true;
             }
    })
    if(!in_list) alert("Неизвестная страна");   
    }
    getData(url,callback);
}

function get_city_info(country){
    var url='/cities';
    var callback=function(error,result) {
        var in_list=false;
    result.forEach(function(element){
       if(country==element.name) 
             {
                 get_population(element.name);in_list=true;
             }
        })
    if(!in_list) alert("Неизвестный город");   
    }
    getData(url,callback);
}

function get_population(name){
     var  url='/populations';
     var callback=function(error,result){
         var message="Численность "+name +" неизвестна";
         result.forEach(function(value){
              if(value.name==name)
                 message='Численность '+value.name+": "+value.count;
          })
         alert(message);
      }
     getData(url,callback);
}
