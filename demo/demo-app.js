angular.module('demo-app', [
    'angular-emoji-flags'
])

.controller('DemoCtrl', function(emojiFlags) {
    var vm = this;
    vm.countries = [
        {
          name: 'Germany',
          code: 'de'
        },
        {
          name: 'USA',
          code: 'us'
        },
        {
          name: 'France',
          code: 'fr'
        }
    ];
    vm.emojiFlags = emojiFlags;
    vm.getFlag = getFlag;
    function getFlag(code) {
        return emojiFlags.getFlagByCountry(code);
    }
});
