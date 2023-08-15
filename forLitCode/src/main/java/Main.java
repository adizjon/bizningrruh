import java.util.*;

public class Main {
    public static void main(String[] args) {
        Integer[] nums = {1,2,3,4,5,6,7,8,9,10};
        List<Integer> list = Arrays.asList(nums);

        Integer max = list
                .stream()
                .mapToInt(v -> v)
                .max().orElseThrow(NoSuchElementException::new);
        System.out.println((max));
    }
}
