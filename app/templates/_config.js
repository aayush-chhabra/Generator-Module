/**
 * RequireJS configuration.
 */
(function(appVersion) {
    'use strict';

    appVersion = appVersion || '';
    require.config(<%= requireConfig %> );
})(window.appVersion);
