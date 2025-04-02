import type { EdgeProps, NodeProps } from '@vue-flow/core'
import type { Interface } from '~/shared/types/interface'

type EdgeData = {
  active: boolean
}

type NodeData = {
  label: string
  active: boolean
}

export type CustomNodeProps = NodeProps<NodeData>
export type CustomEdgeProps = EdgeProps<EdgeData>

export const formatInterfaceToNodeData = (network_interface: Interface): NodeData => {
  return {
    label: network_interface.ifname,
    active: false,
  }
}
