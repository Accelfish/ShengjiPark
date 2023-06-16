$().ready(async function() {
    let currentPage = getURLParameter('page');
    const pageData = {
        pageSize: 10,
        currentPage: parseInt(currentPage, 10) ? parseInt(currentPage, 10) : 1,
    }

    const announcementList = await getData();
    announcementList.sort((a, b) => b.id - a.id);
    const showList = showAnnouncementList(pageData.currentPage, pageData.pageSize, announcementList);
    const listHtml = getAnnouncementListHtml(showList);
    $('#AnnouncementList').html(listHtml);
    const paginationHtml = getPaginationHtml(pageData.currentPage, pageData.pageSize, announcementList);
    $('#AnnouncementPagination').html(paginationHtml);

})

const getData = async function () {
    let res = await fetch('../announcementList.json');
    res = await res.json();
    return res.data;
}

const showAnnouncementList = function(currentPage, pageSize, announcementList) {
    const begin = (currentPage - 1) * pageSize
        ? (currentPage - 1) * pageSize
        : 0;
    const end = currentPage * pageSize > announcementList.length
        ? announcementList.length
        : currentPage * pageSize;
    if (announcementList.length === 0) return [];
    const showList = announcementList.slice(begin, end);
    return showList;
}

const getURLParameter = function (sParam)
{
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++)
    {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

const getAnnouncementListHtml = function (announcementList) {
    const template = $("#announcement__item__template").html();
    let listHtml = '';
    announcementList.forEach((item, index) => {
        const html = template.replace(/{id}/gi, item.id)
            .replace(/{title}/gi, item.title)
            .replace(/{publishDate}/gi, item.publishDate)
            .replace(/{shortDesc}/gi, item.shortDesc);
        listHtml += html;
    });
    return listHtml;
}

const getPaginationHtml = function (currentPage, pageSize, announcementList) {
    // pagination__pre__template
    // pagination__page__template
    // pagination__page-active__template
    // pagination__next__template
    let paginationHtml = '';
    const totalPage = Math.ceil(announcementList.length / pageSize);
    if (totalPage <= 1) return '';
    if (currentPage > 1) {
        const preHtml = $("#pagination__pre__template").html()
            .replace(/{url}/gi, './announcement.html?page=' + (currentPage - 1));
        paginationHtml += preHtml;
    }

    for (let i = 1; i <= totalPage; i++) {
        if (i === currentPage) {
            const html = $("#pagination__page-active__template").html().replace(/{page}/gi, i);
            paginationHtml += html;
        } else {
            const html = $("#pagination__page__template").html()
                .replace(/{page}/gi, i)
                .replace(/{url}/gi, './announcement.html?page=' + (i));
            paginationHtml += html;
        }
    }
    if (currentPage < totalPage) {
        const nextHtml = $("#pagination__next__template").html()
            .replace(/{url}/gi, './announcement.html?page=' + (currentPage + 1));
        paginationHtml += nextHtml;
    }
    return paginationHtml;
}
