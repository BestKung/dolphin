angular.module('bill', []);
angular.module('bill').controller('billController' , function ($scope , $http){
    
    
    
    $scope.clickOrderHeal = function (){
        
    };
    
    
     $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});