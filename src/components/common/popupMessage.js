/**
 *  popup message
 */

import toastr from 'toastr'

export default {

    popupMsg: function(msg, t = 3000) {
        toastr.options = {
            'closeButton': false,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-center',
            'preventDuplicates': true,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': t,
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }

        toastr['success'](msg)
    },
    popupErrMsg: function(msg, t = 5000) {
        toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-center',
            'preventDuplicates': true,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': t,
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }

        toastr['error'](msg)
    },
    popupInfoMsg: function(msg, t = 3000) {
        toastr.options = {
            'closeButton': false,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-center',
            'preventDuplicates': true,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': t,
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }
        toastr['info'](msg)
    }

}
