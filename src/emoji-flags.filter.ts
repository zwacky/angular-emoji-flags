module angularEmojiFlags.filter {

    emojiFlagFilter.$inject = ['emojiFlags'];
    export function emojiFlagFilter(emojiFlags : EmojiFlagsService) {
        return (countryCode: string) => {
            return emojiFlags.getFlagByCountry(countryCode);
        };
    }

    angular.module('angular-emoji-flags')
        .filter('asEmojiFlag', emojiFlagFilter);

}
