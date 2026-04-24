import samplesData from '@/data/samples.json'

export interface Sample {
  sample_id: string
  image_a: string
  image_b: string
  image_ref?: string
  method_a: string
  method_b: string
}

interface SamplesFile {
  samples: Sample[]
}

export function getAllSamples(): Sample[] {
  return (samplesData as SamplesFile).samples
}
