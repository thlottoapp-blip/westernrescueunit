# 🛡️ Git Workflow & Disaster Prevention Guide
## หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์)

เอกสารนี้รวบรวมมาตรฐานสากลในการใช้งาน **Git & GitHub** เพื่อป้องกันโปรเจกต์เสียหาย และสามารถกู้คืนระบบได้ตลอด 24 ชั่วโมง

---

### 1. 🐙 ที่อยู่ Repository ทางการ
- **GitHub Repository**: [https://github.com/thlottoapp-blip/westernrescueunit](https://github.com/thlottoapp-blip/westernrescueunit)
- **Live Production URL**: [https://westernrescueunit.vercel.app](https://westernrescueunit.vercel.app)
- **Supabase Project**: `vrktvwrwsfrirnnqiwea` ([https://vrktvwrwsfrirnnqiwea.supabase.co](https://vrktvwrwsfrirnnqiwea.supabase.co))

---

### 2. 🌳 กลยุทธ์การแบ่ง Branch (Branching Strategy)

| Branch | วัตถุประสงค์ | กฎการใช้งาน |
|---|---|---|
| **`main`** | โค้ด Production จริงที่ออนไลน์อยู่บน Vercel | ต้องผ่านการทดสอบ `npm run build` ผ่าน 100% ก่อน Merge เสมอ |
| **`develop`** | สาขาสำหรับการพัฒนาฟีเจอร์ใหม่รวมกัน | รวมโค้ดที่พัฒนาก่อนนำขึ้น `main` |
| **`feature/<name>`** | สาขาย่อยสำหรับทำฟังก์ชันเฉพาะอย่าง | เช่น `feature/new-dispatch-sound`, `feature/donation-slip` |
| **`hotfix/<name>`** | สาขาด่วนสำหรับแก้บั๊กฉุกเฉินบน Production | แก้ไขเสร็จแล้ว Merge กลับเข้า `main` ทันที |

---

### 3. 🔒 มาตรการความปลอดภัยในการป้องกันโปรเจกต์พัง

1. **ไม่บันทึก Secret / Key ลงใน Git (`.gitignore`):**
   - ไฟล์ `.env.local` และรหัสผ่านต่างๆ จะถูกกันไว้ไม่ให้หลุดขึ้น GitHub โดยเด็ดขาด
   - ใช้ `.env.example` เป็นโครงสร้างตัวอย่างแทน
2. **การทำ Checkpoint ก่อนแก้โค้ดชิ้นใหญ่:**
   - ทุกครั้งก่อนปรับแก้ระบบ ให้ Commit และสร้าง Tag หรือ Branch ย่อยไว้เสมอ
3. **ตรวจสอบ Build ก่อน Push เสมอ:**
   - รันคำสั่ง `npm run build` ในโฟลเดอร์ `prachim-rescue-service-portal` ทุกครั้งก่อน `git push`

---

### 4. 🧯 วิธีกู้คืนโค้ดเมื่อเกิดปัญหา (Disaster Recovery & Rollback)

#### กรณีที่ 1: แก้ไขไฟล์แล้วโค้ดพัง อยากย้อนกลับไปจุดล่าสุดที่ใช้งานได้
```bash
# ยกเลิกการแก้ไขไฟล์ทั้งหมดที่ยังไม่ได้ commit
git restore .

# หรือย้อนกลับไปยังจุด Commit ล่าสุด
git reset --hard HEAD
```

#### กรณีที่ 2: สั่ง Commit ไปแล้ว แต่ต้องการยกเลิกและถอยหลังกลับ 1 ก้าว
```bash
# ยกเลิก Commit ล่าสุด แต่ยังเก็บไฟล์ที่แก้ไว้
git reset --soft HEAD~1
```

#### กรณีที่ 3: ต้องการย้อนกลับไปยังเวอร์ชันเสถียร (Production Tag)
```bash
# ย้อนกลับไปยังเวอร์ชันเริ่มต้นที่เสถียร v1.0.0
git checkout v1.0.0-production
```

---

### 5. 🚀 คำสั่งมาตรฐานประจำวันในการอัปเดตงาน

```bash
# 1. เช็คสถานะไฟล์ที่มีการเปลี่ยนแปลง
git status

# 2. เพิ่มไฟล์ที่แก้ไขเข้าสู่ Stage
git add .

# 3. บันทึกประวัติการแก้ไขอย่างมีความหมาย
git commit -m "feat: เพิ่มระบบอัปโหลดรูปภาพภารกิจ"

# 4. ส่งข้อมูลขึ้น GitHub สำรองข้อมูลบนคลาวด์
git push origin main
```
