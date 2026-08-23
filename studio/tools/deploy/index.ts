import React from 'react';
import type { Tool } from 'sanity';
import { DeployTool, type DeployToolOptions } from './DeployTool';

const icon = () => React.createElement('span', null, '🚀');

export function deployTool(options?: DeployToolOptions): Tool<DeployToolOptions> {
  return { name: 'deploy', title: 'Nasadit web', icon, component: DeployTool, options };
}
