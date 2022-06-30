import React from "react"
import Button from "./Button";
import NavigateTo from "./NavigateTo"
import Tab from "./Tabs/Tab";
import Tabs from "./Tabs/Tabs";

type Resource = {
    url: string;
    name: string;
}

const GitlabResources: Resource[] = [
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867', name: 'Main Board'},
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867?label_name[]=Mission%20%3A%3A%20Deathwishes', name: 'Deathwishes Board'},
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867?label_name[]=Mission%20%3A%3A%20Death%20Products%20to%20Die%20For', name: 'Death Products Board'},
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867?label_name[]=Community%3A%3ADeadTechy', name: 'DeadTechy Board' },
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/3279123?label_name[]=Bug', name: 'Bug Board' },
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/merge_requests?scope=all&utf8=%E2%9C%93&state=opened&wip=no', name: 'Open MRs' },
];

const NotionResources: Resource[] = [
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867', name: 'Main Board'},
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867?label_name[]=Mission%20%3A%3A%20Deathwishes', name: 'Deathwishes Board'},
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867?label_name[]=Mission%20%3A%3A%20Death%20Products%20to%20Die%20For', name: 'Death Products Board'},
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/1409867?label_name[]=Community%3A%3ADeadTechy', name: 'DeadTechy Board' },
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/boards/3279123?label_name[]=Bug', name: 'Bug Board' },
    { url: 'https://gitlab.com/groups/dead-happy-tech/-/merge_requests?scope=all&utf8=%E2%9C%93&state=opened&wip=no', name: 'Open MRs' },
];

export const Resources = () => {
    return (
        <Tabs tabsetName="resourcesTabIndex">
            <Tab title="Gitlab">
                <div className="container pb-4 py-2 grid grid-flow-row grid-cols-6 gap-4 w-full">
                {GitlabResources.map((resource: Resource) => (
                    <Button key={resource.name} text={resource.name} onClickHandler={() => NavigateTo(resource.url, true)} />
                ))}
                </div>
            </Tab>
            <Tab title="Notion">
                <div className="container pb-4 py-2 grid grid-flow-row grid-cols-6 gap-4 w-full">
                {NotionResources.map((resource: Resource) => (
                    <Button key={resource.name} text={resource.name} onClickHandler={() => NavigateTo(resource.url, true)} />
                ))}
                </div>
            </Tab>
        </Tabs>
    )
}