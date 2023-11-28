document.addEventListener('DOMContentLoaded', () => {

    const today = new Date()
    const dateStartEl = document.querySelector('#date_start')
    const dateEndEl = document.querySelector('#date_end')

    dateStartEl.setAttribute('max', dateToInputValFormat(today))
    dateEndEl.setAttribute('max', dateToInputValFormat(today))

    document.querySelector('#refresh-button').addEventListener('click', e => {
        const dateStartValue = dateStartEl.value
        const dateEndValue = dateEndEl.value

        if (!dateStartValue || !dateEndValue) {
            alert('Для обновления графика необходимо ввести значения')
            return
        }

        const dateStartObj = getDateByInputValue(dateStartValue)
        const dateEndObj = getDateByInputValue(dateEndValue)

        console.log(dateStartObj, dateEndObj)

        if (dateStartObj > today) {
            alert('Дата начала должна быть меньше или равна сегодняшней даты')
            return
        }

        if (dateEndObj > today) {
            alert('Дата конца должна быть меньше или равна сегодняшней даты')
            return
        }

        if (dateEndObj < dateStartObj) {
            alert('Дата конца должна быть больше даты начала')
            return
        }

        updateChart(dateStartObj, dateEndObj)
    })
})

function getDateByInputValue(value) {
    const valueArr = value.split('-').map(el => Number(el))

    return new Date(valueArr[0], valueArr[1] - 1, valueArr[2], 0, 0, 0, 0)
}

function dateToInputValFormat(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function updateChart(dateStartObj, dateEndObj) {
    const baseSrc = 'https://datalens.yandex/p94c3n29ewbwe'
    const dateFieldName = '62662692-2b67-4191-8efd-1f435e79c91e'
    const endParams = '_embedded=1&_no_controls=1'
    const newSrc = `${baseSrc}?${dateFieldName}=__interval_${toIsoString(dateStartObj)}_${toIsoString(dateEndObj)}&${endParams}`
    const iFrame = document.querySelector('#chart')
    iFrame.src = newSrc
}

function toIsoString(date) {
    const pad = function (num) {
        return (num < 10 ? '0' : '') + num;
    };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        'Z'
}