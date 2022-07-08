import React, { useEffect, useState } from "react";
import Button from "./Button";
import NavigateTo from "./NavigateTo";

const gitlabStats = () => {

    const [gpat, setGpat] = useState('');
    const [gitData, setGitData] = useState([]);

    useEffect(() => {
      chrome.storage.sync.get(
        {
          gitlabToken: '',
        },
        (items) => {
          setGpat(items.gitlabToken);
        }
      );
      fetch(`https://gitlab.com/api/v4/groups/6472676/merge_requests?state=opened&view=simple&private_token=${gpat}`)
      .then(response => response.json())
      .then(data => {
          setGitData(data);
      });
    })
  

    return (
        <div>
            <h3 className="font-bold">Open MRs</h3>
            <div className="container pb-4 py-2 grid grid-flow-row gap-4 w-full">
            <div className="w-full overflow-y-scroll h-48">
                    <table className="relative table-auto w-full">
                      <thead className="bg-white sticky top-0 text-left py-2 z-50 border-spacing-y-1 mb-2">
                        <tr>
                          <th>Title</th>
                          <th>Created At</th>
                          <th className="text-center">View</th>
                        </tr>
                      </thead>
                      <tbody className="overflow-y-scroll">
                        {gitData.map((mr) => (
                            <tr key={mr.id}>
                                <td>{mr.title}</td>
                                <td>{new Date(mr.created_at).toLocaleDateString()}</td>
                                <td className="text-center"><Button text="Go" onClickHandler={() => NavigateTo(mr.web_url, true)} className="py-0.5" /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                  </div>
            </div>
        </div>
    )
}

export default gitlabStats;