import React, { useEffect, useState } from "react";
import { User } from "../types";
import Button from "./Button";
import NavigateTo from "./NavigateTo";

interface NavigationProps {
  user: User;
}

export const Navigation = (props: NavigationProps) => {
  const { user } = props;
  const [platform, setPlatform] = useState<string>('deathwish');
  const [environment, setEnvironment] = useState<string>('dev');

  const buildURL = () => {
      if (environment !== 'prd') return `https://${platform}.${environment}.deadhappy.io`
      if (platform == 'nova') return 'https://rih.deadhappy.com/nova';
      return `https://${platform}.deadhappy.com`
  }

  return (
    <>
        <div className="container pb-4 py-2 grid grid-flow-row grid-cols-3 gap-4 w-full">
            <select
                defaultValue={environment} 
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-sm" 
                id="environment" 
                onChange={(event) => { setEnvironment(event.target.value) }}
                disabled={platform == 'deadhappy'}
            >
                <option value="dev">DEV</option>
                <option value="stg">STAGING</option>
                <option value="prd">PRODUCTION</option>
            </select>
            <select defaultValue={platform} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-sm" id="platform" onChange={(event) => { setPlatform(event.target.value) }}>
                <option value="deathwish">Deathwish Store</option>
                <option value="products">Products</option>
                <option value="my.deadhappy">My DeadHappy</option>
                <option value="deadhappy" disabled={environment !== 'prd'}>DeadHappy</option>
                <option value="nova" disabled={environment !== 'prd'}>Nova</option>
            </select>
            <Button text="GO!" onClickHandler={() => NavigateTo(buildURL())} />
        </div>
      </>
  );
};