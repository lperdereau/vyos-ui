import type { EdgeProps, NodeProps } from '@vue-flow/core'

type EdgeData = {
  active: boolean
}

type NodeData = {
  label: string
  active: boolean
}

export type CustomNodeProps = NodeProps<NodeData>
export type CustomEdgeProps = EdgeProps<EdgeData>
