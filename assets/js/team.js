document.addEventListener("DOMContentLoaded", function () {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        const info = member.querySelector('.team-member-info');
        const title = info.querySelector('.title');
        const description = info.querySelector('.description');

        member.addEventListener('mouseover', function () {
            const marginBottom = parseInt(window.getComputedStyle(description).marginBottom);
            const neededHeight = title.offsetHeight + description.offsetHeight + marginBottom;
            const availableHeight = member.offsetHeight;

            if (neededHeight > availableHeight) {
                info.style.overflowY = 'scroll';
                info.style.maxHeight = availableHeight + 'px';
            } else {
                info.style.height = neededHeight + 'px';
            }
        });

        member.addEventListener('mouseout', function () {
            info.style.height = '';
            info.style.maxHeight = '';
            info.style.overflowY = '';
        });
    });
});
