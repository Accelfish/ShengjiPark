$().ready(async function() {
    let currentId = getURLParameter('id');
    currentId = parseInt(currentId, 10) ? parseInt(currentId, 10) : 0;
    if(currentId) {
        const announcementList = await getData();
        announcementList.sort((a, b) => b.id - a.id);
        const announcementDetail = getAnnouncementDetail(currentId, announcementList);
        const listHtml = getAnnouncementDetailHtml(announcementDetail);
        $('#AnnouncementDetailContent').html(listHtml);
        const navigationHtml = getNavigationHtml(currentId, announcementList);
        $('#AnnouncementDetailNav').html(navigationHtml);
    }
})

const getData = async function () {
    let res = await fetch('/announcementList.json');
    res = await res.json();
    return res.data;
}

const getAnnouncementDetail = function(id, announcementList) {
    const announcement = announcementList.find(item => item.id === id);
    return announcement;
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

const getAnnouncementDetailHtml = function (announcementDetail) {
    const template = $("#announcementDetail__template").html();
    const html = template.replace(/{id}/gi, announcementDetail.id)
        .replace(/{title}/gi, announcementDetail.title)
        .replace(/{publishDate}/gi, announcementDetail.publishDate)
        .replace(/{content}/gi, announcementDetail.desc);
    return html;
}

const getNavigationHtml = function (currentId, announcementList) {
    let navigationHtml = '';
    const preAnnouncement = announcementList.find(item => item.id < currentId);
    if(preAnnouncement) {
        const preAnnouncementTemplate = $("#navigation__pre__template").html();
        const preAnnouncementHtml = preAnnouncementTemplate.replace(/{id}/gi, preAnnouncement.id);
        navigationHtml += preAnnouncementHtml;
    }

    const nextAnnouncement = announcementList.find(item => item.id > currentId);
    if(nextAnnouncement) {
        const nextAnnouncementTemplate = $("#navigation__next__template").html();
        const nextAnnouncementHtml = nextAnnouncementTemplate.replace(/{id}/gi, nextAnnouncement.id);
        navigationHtml += nextAnnouncementHtml;
    }

    return navigationHtml;
}
