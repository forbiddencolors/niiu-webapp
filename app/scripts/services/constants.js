'use strict';

angular.module('niiuWebappApp')
.value('constants', {
               TWITTER_CONSUMER_KEY: 'z68u41jMxQIfWc6XxpMWBMAlw',
                TWITTER_CONSUMER_SECRET: 'Ja1rg57feAN0RVJiIWiNYNr4fSM2vuTf9pd4iVzXf9J035pQmm',
                FACEBOOK_APP_ID: '642106902524261',
                FACEBOOK_APP_SECRET: '3698a3cdf3071e66de86ce201a5e2ca4',
                NIIU_APP_GUID : '3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
                NIIU_API_URL : 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/' ,
                USER_LOCATOR : 10210,
                USER_TABLE_SCHEMA :  { stores:[{ name:'niiu_user', keyPath:"user" }] },
                USER_DB_NAME : 'niiu_user_table',
                USER_TABLE_NAME : 'niiu_user',
                NIIU_API_VERSION : 200.7,
                ARTICLE_MEDIA_PATH : 'http://dev.niiu.de/img/retrieved_article_media/'

});

