
export function formatDateTH(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function estimateReadingTime(text: string) {
  // ประมาณคำ/นาที 220 คำ → นาทีปัดขั้นต่ำ 1 นาที
  const words = text.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} นาที`;
}