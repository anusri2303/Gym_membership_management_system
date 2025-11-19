import java.io.*;
import java.util.*;

class Member implements Serializable {
    private int id;
    private String name;
    private int age;
    private String membershipType;

    public Member(int id, String name, int age, String membershipType) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.membershipType = membershipType;
    }

    public int getId() {
        return id;
    }

    public String toString() {
        return "ID: " + id + ", Name: " + name + ", Age: " + age + ", Membership: " + membershipType;
    }
}

 class GymManagementSystem {
    private static final String FILE_NAME = "members.dat";

    // Save members to file
    public static void saveMembers(List<Member> members) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(members);
        } catch (IOException e) {
            System.out.println("Error saving members: " + e.getMessage());
        }
    }

    // Load members from file
    public static List<Member> loadMembers() {
        File file = new File(FILE_NAME);
        if (!file.exists()) return new ArrayList<>();

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            return (List<Member>) ois.readObject();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
 }
public class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Member> members = GymManagementSystem.loadMembers();
        int choice;

        do {
            System.out.println("\n=== Gym Membership Management System ===");
            System.out.println("1. Add Member");
            System.out.println("2. View All Members");
            System.out.println("3. Search Member by ID");
            System.out.println("4. Delete Member");
            System.out.println("5. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter ID: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Age: ");
                    int age = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter Membership Type (Monthly/Yearly): ");
                    String type = sc.nextLine();
                    members.add(new Member(id, name, age, type));
                    GymManagementSystem.saveMembers(members);
                    System.out.println("Member added successfully!");
                    break;

                case 2:
                    if (members.isEmpty()) {
                        System.out.println("No members found.");
                    } else {
                        System.out.println("=== Member List ===");
                        for (Member m : members) {
                            System.out.println(m);
                        }
                    }
                    break;

                case 3:
                    System.out.print("Enter Member ID to Search: ");
                    int searchId = sc.nextInt();
                    boolean found = false;
                    for (Member m : members) {
                        if (m.getId() == searchId) {
                            System.out.println("Member Found: " + m);
                            found = true;
                            break;
                        }
                    }
                    if (!found) System.out.println("Member not found.");
                    break;

                case 4:
                    System.out.print("Enter Member ID to Delete: ");
                    int deleteId = sc.nextInt();
                    Iterator<Member> itr = members.iterator();
                    boolean deleted = false;
                    while (itr.hasNext()) {
                        Member m = itr.next();
                        if (m.getId() == deleteId) {
                            itr.remove();
                            deleted = true;
                            break;
                        }
                    }
                    if (deleted) {
                        GymManagementSystem.saveMembers(members);
                        System.out.println("Member deleted successfully!");
                    } else {
                        System.out.println("Member not found.");
                    }
                    break;

                case 5:
                    System.out.println("Exiting... Goodbye!");
                    break;

                default:
                    System.out.println("Invalid choice! Try again.");
            }
        } while (choice != 5);

        sc.close();
    }
}
