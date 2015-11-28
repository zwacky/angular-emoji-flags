describe('the display of angular-emoji-flags', function() {

    var $filter;

    beforeEach(function() {
        module('angular-emoji-flags');

        inject(function(_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should return country flag emojis', function() {
        var testCases = [
            {country: 'us', shouldBe: '🇺🇸'},
            {country: 'fR', shouldBe: '🇫🇷'},
            {country: 'De', shouldBe: '🇩🇪'},
            {country: 'GERMANY', shouldBe: ''},
            {country: '', shouldBe: ''},
            {country: null, shouldBe: ''},
            {country: undefined, shouldBe: ''}
        ];

        testCases.forEach(function(item) {
            expect($filter('asEmojiFlag')(item.country))
                .toBe(item.shouldBe);
        });
    });

});
